declare const __DEV__: boolean, __TEST__: boolean

import {IStorageSetConfig, IWebStorage, ICustomStorage} from './metadata'
import {convertFromJSON, serializeDataToString} from './helpers'

const LOCKER_TEST_KEY = 'LOCKER_TEST_KEY'

export class Driver {
  constructor(public storage: IWebStorage|ICustomStorage) {}

  public set(key: string, data: any, config?: IStorageSetConfig): void {
    this.storage.setItem(key, serializeDataToString(data), config)
  }

  public get(key: string): any {
    return convertFromJSON(this.storage.getItem(key))
  }

  public has(key: string): boolean {
    const storage = <ICustomStorage>this.storage

    return storage.hasItem ? storage.hasItem(key) : this.storage.hasOwnProperty(key)
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
      this.storage.setItem(LOCKER_TEST_KEY, LOCKER_TEST_KEY)
      this.storage.getItem(LOCKER_TEST_KEY)
      this.storage.removeItem(LOCKER_TEST_KEY)
    } catch (e) {
      if (__DEV__ || __TEST__)
        console.error(e)

      return false
    }

    return true
  }
}

