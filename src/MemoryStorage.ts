import {IStorage} from './IStorage'

var _cache = new Map()

var getKeys = function() {
  var keys = []

  for (let key of _cache.keys())
    keys.push(key)

  return keys
}

export class MemoryStorage implements IStorage {
  public hasOwnProperty(key) {
    return _cache.has(key)
  }

  public getItem(key) {
    return _cache.get(key)
  }

  public setItem(key, value) {
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
