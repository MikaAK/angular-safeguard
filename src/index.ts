import {Locker, LockerConfig, LOCKER_DEFAULT_CONFIG_PROVIDER} from './Locker'
import {LockerModule} from './Locker.module'

export * from './Driver'
export * from './PolyfillDriver'
export * from './Locker.module'
export * from './Locker'
export * from './DriverTypes'
export * from './metadata'

// angular-cli
export default {
  ngModule: LockerModule,
  providers: [LockerConfig, Locker]
}
