import {Driver} from './Driver'

export interface IStorageSetConfig {
 secure?: boolean
 maxAge?: number
 domain?: string
 path?: string
 expires?: Date|string
}

export interface IStorage {
  length: number

  getItem(key: string): any
  setItem(key: string, data: any, config?: IStorageSetConfig): void
  removeItem(key: string): void
  clear(): void
  key(index: number): string
}

export interface IWebStorage extends IStorage {
  hasOwnProperty(key: string): boolean
}

export interface ICustomStorage extends IStorage {
  hasItem(key: string): boolean
}

export interface ILockerConfig {
  driverNamespace?: string
  defaultDriverType?: Driver|Driver
  namespaceSeparator?: string
}

export interface ExpiryData {
  config?: IStorageSetConfig
  data: any
}
