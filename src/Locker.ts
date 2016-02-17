declare var sessionStorage, localStorage

import {Driver} from './Driver'
import {MemoryStorage} from './MemoryStorage'

const LOCKER_TYPES = {
  SESSION: new Driver(sessionStorage),
  LOCAL: new Driver(localStorage),
  MEMORY: new Driver(new MemoryStorage())
}

var makeKey = function(locker: Locker, key: string): string {
  return `${locker.namespace}:${key}`
}

export class Locker {
  public DRIVERS: Object = LOCKER_TYPES

  private driver: Driver
  private namespace: string

  constructor() {
    this.setDriver(LOCKER_TYPES.SESSION)
  }

  public setNamespace(namespace) {
    this.namespace = namespace
  }

  public setDriver(driver: Driver) {
    this.driver = driver

    if (!this.driver.isSupported())
      this.driver = LOCKER_TYPES.MEMORY
  }

  public set(key, data, expiry) {
    this.driver.set(makeKey(this, key), data)
  }

  public get(key) {
    return this.driver.get(makeKey(this, key))
  }

  public has(key) {
    return this.driver.has(makeKey(this, key))
  }

  public remove(key) {
    this.driver.remove(makeKey(this, key))
  }

  public key(index) {
    return this.driver.key(index)
  }

  public clear() {
    this.driver.clear()
  }
}
