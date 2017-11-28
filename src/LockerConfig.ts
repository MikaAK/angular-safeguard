import {Inject, Injectable, InjectionToken} from '@angular/core'

import {ILockerConfig} from './metadata'
import {DRIVERS} from './DriverTypes'
import {isNil} from './helpers'

export const LOCKER_USER_CONFIG = new InjectionToken<string>('LOCKER_USER_CONFIG')

const DEFAULT_SEPERATOR = ':'
const DEFAULT_NAMESPACE = ''
const DEFAULT_FALLBACK = DRIVERS.SESSION

export const USER_CONFIG_PROVIDER = {
  provide: LOCKER_USER_CONFIG,
  useValue: {
    namespaceSeparator: DEFAULT_SEPERATOR,
    driverFallback: DEFAULT_FALLBACK,
    driverNamespace: DEFAULT_NAMESPACE
  }
}

const configNotNil = (config: ILockerConfig, prop: string): boolean => !config || isNil(config[prop])

@Injectable()
export class LockerConfig {
  public driverNamespace: string
  public driverFallback: DRIVERS | DRIVERS[]
  public namespaceSeparator: string

  constructor(@Inject(LOCKER_USER_CONFIG) config: ILockerConfig) {
    this.driverNamespace = configNotNil(config, 'driverNamespace') ? DEFAULT_NAMESPACE : config.driverNamespace
    this.driverFallback = configNotNil(config, 'driverFallback') ? DEFAULT_FALLBACK : config.driverFallback
    this.namespaceSeparator = configNotNil(config, 'namespaceSeparator') ? DEFAULT_SEPERATOR : config.namespaceSeparator
  }
}
