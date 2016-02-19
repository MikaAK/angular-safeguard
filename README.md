angular2-locker
=====
[![Build Status](https://travis-ci.org/MikaAK/angular2-locker.svg?branch=master)](https://travis-ci.org/MikaAK/angular2-locker)
[![Code Climate](https://codeclimate.com/github/MikaAK/angular2-locker/badges/gpa.svg)](https://codeclimate.com/github/MikaAK/angular2-locker)

Wrapper around sessionStorage and localStorage for angular2. If both are unavailable will use an in memory storage.

## Getting Started
```bash
$ npm i --save angular2-locker
```

```javascript
import {bootsrap, provide} from 'angular2/core'
import {Locker} from 'angular2-locker'

bootstrap(App, [Locker])

// If you need to specify more you can provide configuration
bootstrap(App, [provide(Locker, {useValue: new Locker({
  driverNamespace: 'MyNamespace',
  defaultDriverType: Locker.DRIVERS.LOCAL
})})])

class App {
  constructor(private locker: Locker) {}
}
```

## Methods
####`get`
`locker.get('myKey')`

####`set`
```javascript
locker.set('myKey', 'value')
locker.set('myKey', {object: 'value'})
```

####`key`
```javascript
locker.set('key', 'value')

locker.key(0) // 'key'
```

####`has`
`locker.has('key')`

####`setNamespace`
`locker.setNamespace('myName')`

####`useDriver`
```javascript
// for more info on drivers look for static methods
var driver = locker.useDriver(Locker.DRIVERS.LOCAL)

driver.set('keey', 'value')
```

####`remove`
`locker.remove('key')`

####`clear`
`locker.empty()`

## Static Methods
#### `DRIVERS`
These are the types of drivers available. If you try to set it to a driver that is unsupported it will fallback to the memory driver
Types are available under `Locker.DRIVERS` or `import {DRIVERS} from 'angular2-locker'`

- `DRIVERS.SESSION` - Session Cache
- `DRIVERS.LOCAL` - Local Storage
- `DRIVERS.MEMORY` - Memory Storage
