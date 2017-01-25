import {TestBed} from '@angular/core/testing'

import {LockerModule} from 'Locker.module'
import {Locker, LockerConfig, LOCKER_USER_CONFIG} from 'Locker'
import {ILockerConfig} from 'metadata'

export const initTestBed = (lockerConfig?: ILockerConfig) => TestBed
  .configureTestingModule(lockerConfig ? LockerModule.withConfig(lockerConfig) : {
    providers: [Locker, LockerConfig, {provide: LOCKER_USER_CONFIG}]
  })

