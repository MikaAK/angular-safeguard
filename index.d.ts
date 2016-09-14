export interface IStorage {
  length: number
  getItem(key: string): any
  setItem(key: string, data: any): void
  removeItem(key: string): void
  clear(): void
  hasOwnProperty(key: string): boolean
  key(index: number): string
}

export class Driver {
  private storage
  constructor(storage: IStorage)
  set(key: string, data: any): void
  get(key: string): any
  has(key: string): boolean
  remove(key: string): void
  clear(): void
  key(index?: number): string
  isSupported(): boolean
}

export abstract class AbstractLockerConfig {
  public driverNamespace: string
  public defaultDriverType: Driver
}

export class MemoryStorage implements IStorage {
  hasOwnProperty(key: any): boolean
  getItem(key: any): any
  setItem(key: any, value: any): void
  removeItem(key: any): void
  clear(): void
  key(index: any): any
  length: number
}

export class CookieStorage implements IStorage {
  hasOwnProperty(key: any): boolean
  getItem(key: any): any
  setItem(key: any, value: any): void
  removeItem(key: any): void
  clear(): void
  key(index: any): any
  length: number
}

export const DRIVERS: {
  SESSION: Driver
  LOCAL: Driver
  MEMORY: Driver
  COOKIE: Driver
}

export class LockerConfig {
  driverNamespace: string
  defaultDriverType: Driver
  namespaceSeparator: string

  constructor(driverNamespace?: string, defaultDriverType?: Driver, namespaceSeparator?: string)
}

export class Locker {
  static DRIVERS: {
      SESSION: Driver
      LOCAL: Driver
      MEMORY: Driver
      COOKIE: Driver
  }
  private driver
  private namespace
  constructor({driverNamespace, defaultDriverType, namespaceSeparator}: LockerConfig)
  setNamespace(namespace: string, separator?: string): void
  useDriver(driver: Driver): Locker
  set(key: any, data: any, expiry?: any): void
  get(key: any): any
  has(key: any): boolean
  remove(key: any): void
  key(index: any): string
  clear(): void
  private _makeKey(key)
}

export class LockerModule {
  static forRoot(lockerConfig: LockerConfig): any
}
