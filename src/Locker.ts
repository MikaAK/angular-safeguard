declare const sessionStorage, localStorage

import {Injectable, Optional} from '@angular/core'
import {IStorageSetConfig} from './IStorage'
import {Driver, DRIVERS, determineDriver} from './Driver'
import {isNil} from './helpers'


@Injectable()
export class LockerConfig {
  constructor(
    @Optional() public driverNamespace?: string,
    @Optional() public defaultDriverType?: Driver,
    @Optional() public namespaceSeparator?: string
  ) {
    if (isNil(this.driverNamespace)) {
      this.driverNamespace = ''
    }

    if (isNil(this.defaultDriverType)) {
      this.defaultDriverType = DRIVERS.SESSION
    }

    if (isNil(this.namespaceSeparator)) {
      this.namespaceSeparator = ':'
    }
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

    this.driver = determineDriver(defaultDriverType)
  }

  public setNamespace(namespace: string = this.lockerConfig.driverNamespace) {
    this.namespace = namespace
  }

  public setSeparator(separator: string = this.lockerConfig.namespaceSeparator) {
    this.separator = separator
  }

  public useDriver(driver: Driver) {
    return new Locker({
      defaultDriverType: determineDriver(driver),
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
