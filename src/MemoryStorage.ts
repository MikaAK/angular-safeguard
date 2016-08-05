import {IStorage} from './IStorage'

const _cache = new Map()

const getKeys = () => Array.from(_cache.keys())

export class MemoryStorage implements IStorage {
  public hasOwnProperty(key) {
    return _cache.has(key)
  }

  public getItem(key) {
    return _cache.get(key)
  }

  public setItem(key, value, config) {
    _cache.set(key, value)
  }

  public removeItem(key) {
    _cache.delete(key)
  }

  public clear() {
    _cache.clear()
  }

  public key(index) {
    return getKeys()[index]
  }

  public get length() {
    return getKeys().length
  }
}
