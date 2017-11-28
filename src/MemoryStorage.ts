import {ICustomStorage} from './metadata'

// This is dumb TODO: REMOVE
declare const Map: any

const _cache = new Map()

const getKeys = (): any[] => Array.from(_cache.keys())

export class MemoryStorage implements ICustomStorage {
  public hasItem(key: string) {
    return _cache.has(key)
  }

  public getItem(key: string) {
    return _cache.get(key)
  }

  public setItem(key: string, value: string) {
    _cache.set(key, value)
  }

  public removeItem(key: string) {
    _cache.delete(key)
  }

  public clear() {
    _cache.clear()
  }

  public key(index: number) {
    return getKeys()[index]
  }

  public get length() {
    return getKeys().length
  }
}
