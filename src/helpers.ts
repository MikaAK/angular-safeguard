import {IStorageSetConfig} from './IStorage'

export interface ExpiryData {
  config?: IStorageSetConfig
  data: any
}

// Convenience
export const encode = encodeURIComponent
export const decode = decodeURIComponent

export const COOKIE_SEP = '; '
export const isInPast = (date: Date) => date <= new Date()
export const isString = (str: string|Date): boolean => typeof str === 'string'
export const toString = (obj: any): string => typeof obj.toUTCString === 'function' ? obj.toUTCString() : obj.toString()
export const isNil = (item: any) => item === undefined || item === null
export const isNumber = (item: any) => typeof item === 'number'

export const isExpired = (data: ExpiryData): boolean => {
  if (!data.config)
    return false

  const {expires} = data.config

  if (!expires)
    return false


  return isInPast(expires instanceof Date ? expires : new Date(expires))
}

export const is = (ctor, value) => value &&
                                   value.constructor === ctor ||
                                   value instanceof ctor

export const convertFromJSON = function(data: any) {
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

export const serializeDataToString = (data: any): string => typeof data === 'object' ? JSON.stringify(data) : data.toString()
