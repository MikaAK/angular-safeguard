import 'core-js/es7/reflect'

import {Locker, LockerConfig} from './Locker'
import {LockerModule} from './Locker.module'

// angular-cli
export default {
  ngModule: LockerModule,
  providers: [LockerConfig, Locker]
}

export * from './Driver'
export * from './PolyfillDriver'
export * from './IStorage'
export * from './Locker.module'
export * from './Locker'
export * from './DriverTypes'
