import {TestBed} from '@angular/core/testing'

import {LockerModule} from '../src/Locker.module'
import {Locker, LockerConfig, LOCKER_USER_CONFIG} from '../src/Locker'
import {ILockerConfig} from '../src/metadata'

export const initTestBed = (lockerConfig?: ILockerConfig) => TestBed
  .configureTestingModule(lockerConfig ? LockerModule.withConfig(lockerConfig) : {
    providers: [Locker, LockerConfig, {provide: LOCKER_USER_CONFIG}]
  })

