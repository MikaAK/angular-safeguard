declare var sessionStorage, localStorage

import {Driver} from './Driver'
import {MemoryStorage} from './MemoryStorage'

const LOCKER_TYPES = {
  SESSION: new Driver(sessionStorage),
  LOCAL: new Driver(localStorage),
  MEMORY: new Driver(new MemoryStorage())
}

export class Locker {
  public static DRIVERS = LOCKER_TYPES

  private driver: Driver
  private namespace: string

  constructor({driverNamespace, defaultDriverType = LOCKER_TYPES.SESSION}) {
    this.setNamespace(driverNamespace)
    this.setDriver(defaultDriverType)
  }

  public setNamespace(namespace = '') {
    this.namespace = namespace
  }

  public setDriver(driver: Driver) {
    this.driver = driver

    if (!this.driver.isSupported())
      this.driver = LOCKER_TYPES.MEMORY
  }

  public set(key, data, expiry) {
    this.driver.set(this._makeKey(key), data)
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

  public key(index) {
    return this.driver.key(index)
  }

  public clear() {
    this.driver.clear()
  }

  private _makeKey(key: string): string {
    return `${this.namespace}:${key}`
  }
}
