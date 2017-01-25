angular-safeguard
=====
[![Build Status](https://travis-ci.org/MikaAK/angular2-locker.svg?branch=master)](https://travis-ci.org/MikaAK/angular2-locker)
[![Code Climate](https://codeclimate.com/github/MikaAK/angular2-locker/badges/gpa.svg)](https://codeclimate.com/github/MikaAK/angular2-locker)

***Note: This library was renamed from angular2-locker to angular-safeguard***

Wrapper around sessionStorage, localStorage and cookies for angular. If both are unavailable will use an in memory storage.

Expiry is also implemented for all drivers not just cookies

## Getting Started
```bash
$ npm i --save angular-safeguard
```

```typescript
import {NgModule} from '@angular/core'
import {LockerModule, Locker, LockerConfig} from 'angular-safeguard'

@Component({
  selector: 'app',
  template: `...`
})
class App {
  constructor(locker: Locker) {
    locker.set('something', value)
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
  defaultDriverType: DRIVERS.MEMORY,
  namespaceSeperator: '-'
}

// to set fallback drivers in order of preference, pass in an Array of Driver
const lockerConfig = {
  driverNamespace: 'nameSpace',
  defaultDriverType: [DRIVERS.LOCAL, DRIVERS.SESSION, DRIVERS.COOKIE],
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
####`get`
`locker.get('myKey')`

####`set`
```typescript
locker.set('myKey', 'value')
locker.set('myKey', {object: 'value'})

const expiry = new Date()

expiry.setHours(expiry.getHours() + 1)

locker.set('myKey', 'value', {expiry}) // will work with every driver type

// You can also use set to pass options for cookies like maxAge and such
```

####`key`
```typescript
locker.set('key', 'value')

locker.key(0) // 'key'
```

####`has`
`locker.has('key')`

####`setNamespace`
```typescript
locker.setNamespace('myName')
locker.setNamespace() // Resets to lockerConfig default
```

####`setSeparator`

```typescript
locker.setSeparator('myName')
locker.setSeparator() // Resets to lockerConfig default
```

####`useDriver`
```typescript
const driver = locker.useDriver(Locker.DRIVERS.LOCAL)

driver.set('keey', 'value')
```

####`remove`
`locker.remove('key')`

####`clear`
`locker.clear()`

## Static Methods
#### `DRIVERS`

These are the types of drivers available. If you try to set it to a (single) driver that is unsupported it will fallback to the memory driver.  To set fallback drivers, pass in an Array of drivers in the order or preference:

Again, if every driver in Array is unsupported, it will fall back to memory driver.

Types are available under `Locker.DRIVERS` or `import {DRIVERS} from 'angular-safeguard'`

- `DRIVERS.SESSION` - Session Cache
- `DRIVERS.LOCAL` - Local Storage
- `DRIVERS.MEMORY` - Memory Storage
- `DRIVERS.COOKIE` - Cookies
