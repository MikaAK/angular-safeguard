declare const __DEV__

import {IStorage, IStorageSetConfig} from './IStorage'
import {convertFromJSON} from './helpers'
import {MemoryStorage} from './MemoryStorage'
import {CookieStorage} from './CookieStorage'

const LOCKER_TEST_KEY = 'LOCKER_TEST_KEY'

export class Driver {
  constructor(private storage: IStorage) {}

  public set(key: string, data: any, config?: IStorageSetConfig): void {
    const cookieData: string = typeof data === 'object' ? JSON.stringify(data) : data.toString()

    this.storage.setItem(key, cookieData, config)
  }

  public get(key: string): any {
    return convertFromJSON(this.storage.getItem(key))
  }

  public has(key: string): boolean {
    return this.storage.hasOwnProperty(key)
  }

  public remove(key: string): void {
    this.storage.removeItem(key)
  }

  public clear(): void {
    this.storage.clear()
  }

  public key(index = 0): string {
    return this.storage.key(index)
  }

  public isSupported(): boolean {
    try {
      this.set(LOCKER_TEST_KEY, LOCKER_TEST_KEY)
      this.get(LOCKER_TEST_KEY)
      this.remove(LOCKER_TEST_KEY)
    } catch (e) {
      __DEV__ && console.error(e)

      return false
    }

    return true
  }
}

export const DRIVERS = {
  LOCAL: new Driver(localStorage),
  SESSION: new Driver(sessionStorage),
  MEMORY: new Driver(new MemoryStorage()),
  COOKIE: new Driver(new CookieStorage())
}

export function determineDriver(defaultDriverType?: any): Driver {
  let hasFallback = Array.isArray(defaultDriverType)

  if (!hasFallback) {
    return defaultDriverType.isSupported() ? defaultDriverType: DRIVERS.MEMORY
  }

  let driver = DRIVERS.MEMORY
  for (let _driver of defaultDriverType) {
    if (_driver.isSupported()) {
      driver = _driver
      break
    }
  }

  return driver
}