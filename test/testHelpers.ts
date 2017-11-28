import {TestBed} from '@angular/core/testing'
import * as td from 'testdouble'

import {DRIVER_TYPES_PROVIDERS, DRIVERS, LOCKER_DRIVER_TYPES} from '../src/DriverTypes'
import {LockerModule} from '../src/Locker.module'
import {Locker} from '../src/Locker'
import {LockerConfig, USER_CONFIG_PROVIDER, LOCKER_USER_CONFIG} from '../src/LockerConfig'
import {ILockerConfig, IDriverType} from '../src/metadata'

export const initTestBed = (lockerConfig?: ILockerConfig) => TestBed
  .configureTestingModule(lockerConfig ? LockerModule.withConfig(lockerConfig) : {
    providers: [Locker, LockerConfig, ...DRIVER_TYPES_PROVIDERS, USER_CONFIG_PROVIDER]
  })

export const initTestBedWithDriverTypes = (driverTypes: IDriverType[], lockerConfig?: ILockerConfig) => TestBed
  .configureTestingModule({
    providers: [
      Locker,
      LockerConfig,
      ...driverTypes.map((config) => ({
        ...config,
        provide: LOCKER_DRIVER_TYPES,
        multi: true
      })),
      lockerConfig ? {provide: LOCKER_USER_CONFIG, useValue: lockerConfig} : USER_CONFIG_PROVIDER
    ]
  })

export const getFallbackDriverType = (locker: Locker) => locker['_getFallbackDriverType']().type

export const resetDriverStubs = () => td.reset()
export const stubDriverSupport = (driverTypes: IDriverType[], type: DRIVERS, isSupported: boolean) => {
  const driverType = driverTypes.find((driverType) => type === driverType.type)

  td.replace(driverType.storage, 'isSupported')

  td.when(driverType.storage.isSupported())
    .thenReturn(isSupported)
}
