import {IExpiryData} from './metadata'

// Convenience
export function encode(str: string): string {
  return encodeURIComponent(str)
}

export function decode(str: string): string {
  return decodeURIComponent(str)
}

export const COOKIE_SEP = '; '

export function isInPast(date: Date): boolean {
  return date <= new Date()
}

export function isString(str: string | Date): boolean {
  return typeof str === 'string'
}

export function toString(obj: any): string {
  return typeof obj.toUTCString === 'function' ? obj.toUTCString() : obj.toString()
}

export function isNil(item: any) {
  return item === undefined || item === null
}

export function isNumber(item: any) {
  return typeof item === 'number'
}

export function isExpired(data: IExpiryData): boolean {
  if (!data.config)
    return false

  const {expires} = data.config

  if (!expires)
    return false

  return isInPast(expires instanceof Date ? expires : new Date(expires))
}

export function is(ctor: any, value: any): boolean {
  return value &&
         value.constructor === ctor ||
         value instanceof ctor
}

export function convertFromJSON(data: any): any {
  if (typeof data !== 'string') {
    return data
  } else {
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }
}

export function serializeDataToString(data: any): string {
  return typeof data === 'object' ? JSON.stringify(data) : data.toString()
}
