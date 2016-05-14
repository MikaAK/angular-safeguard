declare const __DEV__

import {IStorage, IStorageSetConfig} from './IStorage'
import {convertFromJSON} from './helpers'

const LOCKER_TEST_KEY = 'LOCKER_TEST_KEY'

class Driver {
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
      if (__DEV__)
        console.error(e)

      return false
    }

    return true
  }
}

export {Driver}
