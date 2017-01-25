import {IStorageSetConfig} from './metadata'
import {COOKIE_SEP, encode, decode, toString, isString, isNumber} from './helpers'

export const DEFAULT_CONFIG: IStorageSetConfig = {}

export class Cookie {
  public static getAll(): Object {
    return document.cookie
      .split(COOKIE_SEP)
      .filter(value => !!value)
      .map(items => items.split('='))
      .reduce((res, [key, value]) => (res[decode(key)] = decode(value), res), {})
  }

  public static get(key): any {
    return this.getAll()[key]
  }

  public static set(key, value, config = DEFAULT_CONFIG): void {
    const {secure, maxAge, domain, path, expires} = config

    var cookie = `${encode(key)}=${encode(value)}`

    if (secure)
      cookie += ';secure'

    if (isNumber(maxAge) && !isNaN(maxAge))
      cookie += `;max-age=${maxAge}`

    if (domain)
      cookie += `;domain=${domain}`

    if (path)
      cookie += `;path=${path}`

    if (expires)
      cookie += `;expires=${isString(expires) ? expires : toString(expires)}`

    document.cookie = cookie
  }

  public static remove(key) {
    this.set(key, this.get(key), {maxAge: 0})
  }
}
