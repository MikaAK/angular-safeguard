import {Inject, Injectable, OpaqueToken} from '@angular/core'

import {ILockerConfig} from './metadata'
import {DRIVERS} from './DriverTypes'
import {isNil} from './helpers'

export const LOCKER_USER_CONFIG = new OpaqueToken('LOCKER_USER_CONFIG')

export const USER_CONFIG_PROVIDER = {
  provide: LOCKER_USER_CONFIG,
  useValue: {
    namespaceSeparator: ':',
    driverFallback: DRIVERS.SESSION,
    driverNamespace: ''
  }
}

@Injectable()
export class LockerConfig {
  public driverNamespace: string
  public driverFallback: DRIVERS|DRIVERS[]
  public namespaceSeparator: string

  constructor(@Inject(LOCKER_USER_CONFIG) config: ILockerConfig) {
    this.driverNamespace = !config || isNil(config.driverNamespace) ? '' : config.driverNamespace
    this.driverFallback = !config || isNil(config.driverFallback) ? DRIVERS.SESSION : config.driverFallback
    this.namespaceSeparator = !config || isNil(config.namespaceSeparator) ? ':' : config.namespaceSeparator
  }
}

