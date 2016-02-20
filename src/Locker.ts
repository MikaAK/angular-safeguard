declare const sessionStorage, localStorage

import {Injectable} from 'angular2/core'
import {Driver} from './Driver'
import {MemoryStorage} from './MemoryStorage'
import {CookieStorage} from './CookieStorage'

const DRIVERS = {
  LOCAL: new Driver(localStorage),
  SESSION: new Driver(sessionStorage),
  MEMORY: new Driver(new MemoryStorage()),
  COOKIE: new Driver(new CookieStorage())
}

export {DRIVERS}

@Injectable()
export class Locker {
  public static DRIVERS = DRIVERS

  private driver: Driver
  private namespace: string

  constructor({driverNamespace, defaultDriverType = DRIVERS.SESSION}: {driverNamespace?: string, defaultDriverType?: Driver}) {
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

  public set(key, data, expiry?) {
    if (expiry)
      console.warn('Expiry is not implimented yet')

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
