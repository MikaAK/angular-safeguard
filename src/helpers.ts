
export interface ExpiryData {
  expires?: Date|string
  data: any
}

// Convenience
export const encode = encodeURIComponent
export const decode = decodeURIComponent

export const COOKIE_SEP = '; '
export const isAfterToday = (date: Date) => date > new Date()
export const isString = (str: string|Date): boolean => typeof str === 'string'
export const toString = (obj: any): string => typeof obj.toUTCString === 'function' ? obj.toUTCString() : obj.toString()
export const isNil = (item: any) => item === undefined || item === null
export const getDataWithExpiry = (expData) => isExpired(expData) ? undefined : expData.data

export const setDataWithExpiry = (data, expires?: Date|string): ExpiryData => {
  return expires ? {data, expires: toString(expires)} : data
}

export const isExpired = (data: ExpiryData): boolean => {
  if (!data.expires)
    return false

  const {expires} = data

  return isAfterToday(expires instanceof Date ? expires : new Date(expires))
}

export const convertFromJSON = function(data: any) {
  if (typeof data !== 'string')
    return data
  else {
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }
}

