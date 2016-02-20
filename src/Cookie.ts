const COOKIE_SEP = '; '

// Convenience
var encode = encodeURIComponent
var decode = decodeURIComponent

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

  public static set(key, value, {secure, maxAge, domain, expires}: {secure?: boolean, maxAge?: number, domain?: string, expires?: Date}): void {
    var cookie = `${encode(key)}=${encode(value)}`

    if (secure)
      cookie += ';secure'

    if (!isNaN(maxAge))
      cookie += `;max-age=${maxAge}`

    if (domain)
      cookie += `;domain=${domain}`

    if (expires)
      cookie += `;expires=${expires.toUTCString()}`

    document.cookie = cookie
  }

  public static remove(key) {
    this.set(key, this.get(key), {maxAge: 0})
  }
}
