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

export const DRIVER_TYPES = new OpaqueToken('DRIVER_TYPES')
