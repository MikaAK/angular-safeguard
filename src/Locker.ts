import {Injectable, Inject, OpaqueToken} from '@angular/core'

import {IStorageSetConfig} from './IStorage'
import {Driver} from './Driver'
import {PollyfillDriver} from './PolyfillDriver'
import {DRIVERS} from './DriverTypes'

import {isNil} from './helpers'

export const LOCKER_USER_CONFIG = new OpaqueToken('LOCKER_USER_CONFIG')

export const LOCKER_DEFAULT_CONFIG_PROVIDER = {
  provide: LOCKER_USER_CONFIG,
  useValue: {
    namespaceSeparator: ':',
    defaultDriverType: DRIVERS.SESSION,
    driverNamespace: ''
  }
}

export interface ILockerConfig {
  driverNamespace?: string
  defaultDriverType?: Driver|Driver[]
  namespaceSeparator?: string
}

@Injectable()
export class LockerConfig {
  public driverNamespace: string
  public defaultDriverType: Driver|Driver[]
  public namespaceSeparator: string

  constructor(@Inject(LOCKER_USER_CONFIG) config: ILockerConfig) {
    this.driverNamespace = isNil(config.driverNamespace) ? '' : config.driverNamespace
    this.defaultDriverType = isNil(config.defaultDriverType) ? DRIVERS.SESSION : config.defaultDriverType
    this.namespaceSeparator = isNil(config.namespaceSeparator) ? ':' : config.namespaceSeparator
  }
}

@Injectable()
export class Locker {
  public static DRIVERS = DRIVERS

  private driver: Driver
  private namespace: string
  private separator: string

  constructor(public lockerConfig: LockerConfig) {
    const {defaultDriverType} = lockerConfig

    this.setNamespace()
    this.setSeparator()

    this.driver = this._determineDriver(defaultDriverType)
  }

  public setNamespace(namespace: string = this.lockerConfig.driverNamespace) {
    this.namespace = namespace
  }

  public setSeparator(separator: string = this.lockerConfig.namespaceSeparator) {
    this.separator = separator
  }

  public useDriver(driver: Driver|Driver[]) {
    return new Locker({
      defaultDriverType: this._determineDriver(driver),
      driverNamespace: this.namespace,
      namespaceSeparator: this.separator
    })
  }

  public set(key, data, config?: IStorageSetConfig) {
    this.driver.set(this._makeKey(key), data, config)
  }

  public get(key) {
    return this.driver.get(this._makeKey(key))
  }

  public has(key) {
    return this.driver.has(this._makeKey(key))
  }

  public remove(key) {
    this.driver.remove(this._makeKey(key))
  }


  public key(index?) {
    return this._decodeKey(this.driver.key(index))
  }

  public clear() {
    this.driver.clear()
  }

  private _makeKey(key: string): string {
    return this.namespace ? `${this.namespace}${this.separator}${key}` : key
  }

  private _decodeKey(key: string): string {
    if (this.namespace)
      return key.slice(this.namespace.length + this.separator.length)
    else
      return key
  }

  private _determineDriver(preferredDrivers: Driver|Driver[]): Driver {
    if (Array.isArray(preferredDrivers))
      return preferredDrivers
        .find(driver => driver.isSupported()) || DRIVERS.MEMORY

    else if (preferredDrivers)
      return preferredDrivers.isSupported() ? preferredDrivers : DRIVERS.MEMORY

    else
      return DRIVERS.MEMORY
  }
}
