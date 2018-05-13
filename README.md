angular-safeguard
=====
[![Build Status](https://travis-ci.org/MikaAK/angular-safeguard.svg?branch=master)](https://travis-ci.org/MikaAK/angular-safeguard)

[![Code Climate](https://codeclimate.com/github/MikaAK/angular2-locker/badges/gpa.svg)](https://codeclimate.com/github/MikaAK/angular2-locker)

***Note: This library was renamed from angular2-locker to angular-safeguard***

Wrapper around sessionStorage, localStorage and cookies for angular. If both are unavailable will use an in memory storage.

Expiry is also implemented for all drivers not just cookies

***Breaking Changes in 2.0:***
> With 2.0 this library supports AoT. As a result there was two options, one to create a
> storage type for each different storage, and two to change `set/get` and other methods
> to explicitly use a driver.
> The latter means we can still provide in-memory fallback without
> the hassle of you writing conditions everywhere.
> All methods on locker now have an extra param for storage type such as `get(DRIVERS.SESSION, 'key')`

## Getting Started
```bash
$ npm i --save angular-safeguard
```

```typescript
import {NgModule} from '@angular/core'
import {LockerModule, Locker, DRIVERS} from 'angular-safeguard'

@Component({
  selector: 'app',
  template: `...`
})
class App {
  constructor(locker: Locker) {
    locker.set(DRIVERS.SESSION, 'something', value)
  }
}

@NgModule({
  imports: [LockerModule],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {
  constructor(private locker: Locker) {}
}
```

### With Custom Config
```typescript
import {LockerModule, LockerConfig, DRIVERS} from 'angular-safeguard'

// to set a single driver
const lockerConfig = {
  driverNamespace: 'nameSpace',
  driverFallback: DRIVERS.MEMORY,
  namespaceSeperator: '-'
}

// to set fallback drivers in order of preference, pass in an Array of Driver
const lockerConfig = {
  driverNamespace: 'nameSpace',
  driverFallback: [DRIVERS.LOCAL, DRIVERS.SESSION, DRIVERS.COOKIE],
  namespaceSeperator: '-'
}

@NgModule({
  imports: [LockerModule.withConfig(lockerConfig)]
  ...
})
class SomeModule {

}
```

## Methods
#### `get`
`locker.get(DRIVERS.SESSION, 'myKey')`

#### `set`
```typescript
locker.set(DRIVERS.SESSION, 'myKey', 'value')
locker.set(DRIVERS.SESSION, 'myKey', {object: 'value'})

const expiry = new Date()

expiry.setHours(expiry.getHours() + 1)

locker.set(DRIVERS.SESSION, 'myKey', 'value', {expiry}) // will work with every driver type

// You can also use set to pass options for cookies like maxAge and such
```

#### `key`
```typescript
locker.set(DRIVERS.COOKIES, 'key', 'value')

locker.key(DRIVERS.COOKIES, 0) // 'key'
```

#### `has`
`locker.has(DRIVERS.LOCAL, 'key')`

#### `setNamespace`
```typescript
locker.setNamespace('myName')
locker.setNamespace() // Resets to lockerConfig default
```

#### `setSeparator`

```typescript
locker.setSeparator('myName')
locker.setSeparator() // Resets to lockerConfig default
```

#### `remove`
`locker.remove(DRIVERS.SESSION, 'key')`

#### `clear`
`locker.clear(DRIVERS.SESSION)`

## Static Methods
#### `DRIVERS`

These are the types of drivers available. If you try to set it to a (single) driver that is unsupported it will fallback to the memory driver.  To set fallback drivers, pass in an Array of drivers in the order or preference:

Again, if every driver in Array is unsupported, it will fall back to memory driver.

Types are available from `import {DRIVERS} from 'angular-safeguard'`

- `DRIVERS.SESSION` - Session Cache
- `DRIVERS.LOCAL` - Local Storage
- `DRIVERS.MEMORY` - Memory Storage
- `DRIVERS.COOKIE` - Cookies


## FAQ

**Why is my data getting set to {data: myDataHere} instead of just myDataHere?**:
angular-safeguard provides expiry on more than just cookies, to do this it's necessary to create a bit of a more complex
object so we can store expiry and more
