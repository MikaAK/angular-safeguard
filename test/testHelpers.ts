import {TestBed} from '@angular/core/testing'

import {DRIVER_TYPES_PROVIDERS} from '../src/DriverTypes'
import {LockerModule} from '../src/Locker.module'
import {Locker} from '../src/Locker'
import {LockerConfig, USER_CONFIG_PROVIDER, LOCKER_USER_CONFIG} from '../src/LockerConfig'
import {ILockerConfig} from '../src/metadata'

export const initTestBed = (lockerConfig?: ILockerConfig) => TestBed
  .configureTestingModule(lockerConfig ? LockerModule.withConfig(lockerConfig) : {
    providers: [Locker, LockerConfig, ...DRIVER_TYPES_PROVIDERS, USER_CONFIG_PROVIDER]
  })

