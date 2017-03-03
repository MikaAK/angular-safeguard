import {TestBed} from '@angular/core/testing'

import {LockerModule} from 'Locker.module'
import {Locker, LockerConfig, ILockerConfig, LOCKER_USER_CONFIG} from 'Locker'

export const initTestBed = (lockerConfig?: ILockerConfig) => TestBed
  .configureTestingModule(lockerConfig ? LockerModule.withConfig(lockerConfig) : {
    providers: [Locker, LockerConfig, {provide: LOCKER_USER_CONFIG}]
  })

