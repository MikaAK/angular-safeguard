import {IStorageSetConfig} from './metadata'
import {COOKIE_SEP, encode, decode, toString, isString, isNumber} from './helpers'

export const DEFAULT_CONFIG: IStorageSetConfig = {}

export class Cookie {
  public static getAll(): {[key: string]: any} {
    return document.cookie
      .split(COOKIE_SEP)
      .filter((value) => !!value)
      .map((items: string) => items.split('='))
      .reduce((res: {[key: string]: any}, [key, value]: [string, string]) => {
        res[decode(key)] = decode(value)

        return res
      }, {})
  }

  public static get(key: string): any {
    return this.getAll()[key]
  }

  public static set(key: string, value: any, config = DEFAULT_CONFIG): void {
    const {secure, maxAge, domain, path, expires} = config

    let cookie = `${encode(key)}=${encode(value)}`

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

  public static remove(key: string) {
    this.set(key, this.get(key), {maxAge: 0})
  }
}
