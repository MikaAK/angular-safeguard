import {ICustomStorage, IStorageSetConfig} from './metadata'
import {Cookie} from './Cookie'

export class CookieStorage implements ICustomStorage {
  public hasItem(key: string) {
    return <boolean>!!Cookie.get(key)
  }

  public getItem(key: string) {
    return Cookie.get(key)
  }

  public setItem(key: string, value: any, config: IStorageSetConfig) {
    Cookie.set(key, value, config)
  }

  public removeItem(key: string) {
    Cookie.remove(key)
  }

  public clear() {
    Object.keys(Cookie.getAll())
      .forEach((key) => Cookie.remove(key))
  }

  public key(index: number) {
    const cookies = Object.keys(Cookie.getAll())

    return cookies[index]
  }

  public get length() {
    return Object.keys(Cookie.getAll()).length
  }
}
