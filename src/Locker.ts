declare const sessionStorage, localStorage

import {Injectable, Optional} from '@angular/core'
import {IStorageSetConfig} from './IStorage'
import {Driver, DRIVERS} from './Driver'

@Injectable()
export class LockerConfig {
  constructor(
    @Optional() public driverNamespace: string = '',
    @Optional() public defaultDriverType: Driver = DRIVERS.SESSION,
    @Optional() public namespaceSeparator: string = ':'
  ) {}
}

@Injectable()
export class Locker {
  public static DRIVERS = DRIVERS

  private driver: Driver
  private namespace: string
  private separator: string

  constructor(lockerConfig: LockerConfig) {
    const {driverNamespace, defaultDriverType, namespaceSeparator} = lockerConfig

    this.setNamespace(driverNamespace, namespaceSeparator)
    this.driver = defaultDriverType.isSupported() ? defaultDriverType : DRIVERS.MEMORY
  }

  public setNamespace(namespace, separator) {
    this.namespace = namespace
    this.separator = separator
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
