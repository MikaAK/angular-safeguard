angular2-locker
=====
[![Build Status](https://travis-ci.org/MikaAK/angular2-locker.svg?branch=master)](https://travis-ci.org/MikaAK/angular2-locker)
[![Code Climate](https://codeclimate.com/github/MikaAK/angular2-locker/badges/gpa.svg)](https://codeclimate.com/github/MikaAK/angular2-locker)

Wrapper around sessionStorage and localStorage for angular2. If both are unavailable will use an in memory storage.

## Getting Started
```bash
$ npm i --save angular2-locker
```

```typescript
import {NgModule} from '@angular/core'
import {LockerModule, Locker, LockerConfig} from 'angular2-locker'

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
  providers: [LockerModule],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {
  constructor(private locker: Locker) {}
}
```

### With Custom Config
```typescript
import {LockerModule, LockerConfig, DRIVERS} from 'angular2-locker'

const lockerConfig = new LockerConfig('nameSpace', DRIVERS.MEMORY, '-')

@NgModule({
  providers: [LockModule.forRoot(lockerConfig)]
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
```

####`key`
```typescript
locker.set('key', 'value')

locker.key(0) // 'key'
```

####`has`
`locker.has('key')`

####`setNamespace`
`locker.setNamespace('myName')`
`locker.setNamespace()` - Resets to lockerConfig default

####`setSeparator`
`locker.setSeparator('-')`
`locker.setSeparator()` - Resets to lockerConfig default


####`useDriver`
```typescript
// for more info on drivers look for static methods
var driver = locker.useDriver(Locker.DRIVERS.LOCAL)

driver.set('keey', 'value')
```

####`remove`
`locker.remove('key')`

####`clear`
`locker.clear()`

## Static Methods
#### `DRIVERS`
These are the types of drivers available. If you try to set it to a driver that is unsupported it will fallback to the memory driver
Types are available under `Locker.DRIVERS` or `import {DRIVERS} from 'angular2-locker'`

- `DRIVERS.SESSION` - Session Cache
- `DRIVERS.LOCAL` - Local Storage
- `DRIVERS.MEMORY` - Memory Storage
- `DRIVERS.COOKIE` - Cookies
