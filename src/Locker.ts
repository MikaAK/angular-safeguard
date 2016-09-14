declare const sessionStorage, localStorage

import {Injectable, Optional} from '@angular/core'
import {IStorageSetConfig} from './IStorage'
import {Driver, DRIVERS} from './Driver'
import {isNil} from './helpers'

@Injectable()
export class LockerConfig {
  constructor(
    @Optional() public driverNamespace?: string,
    @Optional() public defaultDriverType?: Driver,
    @Optional() public namespaceSeparator?: string
  ) {
    if (isNil(this.driverNamespace))
      this.driverNamespace = ''

    if (isNil(this.defaultDriverType))
      this.defaultDriverType = DRIVERS.SESSION

    if (isNil(this.namespaceSeparator))
      this.namespaceSeparator = ':'
  }
}

@Injectable()
export class Locker {
  public static DRIVERS = DRIVERS

  private driver: Driver
  private namespace: string
  private separator: string

  constructor(private lockerConfig: LockerConfig) {
    this.setNamespace(this.lockerConfig.driverNamespace, this.lockerConfig.namespaceSeparator)
    this.driver = this.lockerConfig.defaultDriverType.isSupported() ? this.lockerConfig.defaultDriverType : DRIVERS.MEMORY
  }

  public setNamespace(namespace: string, separator?: string) {
    this.namespace = namespace
    this.separator = separator ? separator : this.lockerConfig.namespaceSeparator
  }

  public useDriver(driver: Driver) {
    return new Locker({
      defaultDriverType: driver.isSupported() ? driver : DRIVERS.MEMORY,
      driverNamespace: this.namespace,
      namespaceSeparator: this.separator
    })
  }

  public set(key, data) { // , config?: IStorageSetConfig
    this.driver.set(this._makeKey(key), data, {})
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
    return this.driver.key(index)
  }

  public clear() {
    this.driver.clear()
  }

  private _makeKey(key: string): string {
    return this.namespace ? `${this.namespace}${this.separator}${key}` : key
  }
}
