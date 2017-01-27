import {Injectable, OpaqueToken} from '@angular/core'

import {PollyfillDriver} from './PolyfillDriver'
import {Driver} from './Driver'
import {MemoryStorage} from './MemoryStorage'
import {CookieStorage} from './CookieStorage'
import {DriverType} from './metadata'

export const enum DRIVERS {
  LOCAL,
  SESSION,
  MEMORY,
  COOKIE
}

@Injectable()
export class LocalStorageDriver implements DriverType {
  public storage = new PollyfillDriver(localStorage)
  public type = DRIVERS.LOCAL
}

@Injectable()
export class SessionStorageDriver implements DriverType {
  public storage = new PollyfillDriver(sessionStorage)
  public type = DRIVERS.SESSION
}

@Injectable()
export class MemoryStorageDriver implements DriverType {
  public storage = new PollyfillDriver(new MemoryStorage())
  public type = DRIVERS.MEMORY
}

@Injectable()
export class CookieStorageDriver implements DriverType {
  public storage = new Driver(new CookieStorage())
  public type = DRIVERS.COOKIE
}

export const LOCKER_DRIVER_TYPES = new OpaqueToken('LOCKER_DRIVER_TYPES')

export const DRIVER_TYPES_PROVIDERS = [{
  provide: LOCKER_DRIVER_TYPES,
  multi: true,
  useValue: LocalStorageDriver
}, {
  provide: LOCKER_DRIVER_TYPES,
  multi: true,
  useValue: SessionStorageDriver
}, {
  provide: LOCKER_DRIVER_TYPES,
  multi: true,
  useValue: MemoryStorageDriver
}, {
  provide: LOCKER_DRIVER_TYPES,
  multi: true,
  useValue: CookieStorageDriver
}]
