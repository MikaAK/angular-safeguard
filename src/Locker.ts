declare const sessionStorage, localStorage

import {Injectable, Optional} from '@angular/core'
import {IStorageSetConfig} from './IStorage'
import {Driver} from './Driver'
import {MemoryStorage} from './MemoryStorage'
import {CookieStorage} from './CookieStorage'

export const DRIVERS = {
  LOCAL: new Driver(localStorage),
  SESSION: new Driver(sessionStorage),
  MEMORY: new Driver(new MemoryStorage()),
  COOKIE: new Driver(new CookieStorage())
}

@Injectable()
export class LockerConfig {
  constructor(
    @Optional() public driverNamespace: string = '',
    @Optional() public defaultDriverType: Driver = DRIVERS.SESSION
  ) {}
}

@Injectable()
export class Locker {
  public static DRIVERS = DRIVERS

  private driver: Driver
  private namespace: string

  constructor(@Optional() lockerConfig: LockerConfig) {
    const {driverNamespace, defaultDriverType} = lockerConfig

    this.setNamespace(driverNamespace)
    this.driver = defaultDriverType.isSupported() ? defaultDriverType : DRIVERS.MEMORY
  }

  public setNamespace(namespace = '') {
    this.namespace = namespace
  }

  public useDriver(driver: Driver) {
    return new Locker({
      defaultDriverType: driver.isSupported() ? driver : DRIVERS.MEMORY,
      driverNamespace: this.namespace
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
    return this.namespace ? `${this.namespace}:${key}` : key
  }
}
