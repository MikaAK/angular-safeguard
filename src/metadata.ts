import {Driver} from './Driver'
import {DRIVERS} from './DriverTypes'

export interface IStorageSetConfig {
  secure?: boolean
  maxAge?: number
  domain?: string
  path?: string
  expires?: Date | string
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
  [key: string]: string | DRIVERS | DRIVERS[]
  driverNamespace?: string
  driverFallback?: DRIVERS | DRIVERS[]
  namespaceSeparator?: string
}

export interface IExpiryData {
  config?: IStorageSetConfig
  data: any
}

export interface IDriverType {
  storage: Driver
  type: string
}
