import {PollyfillDriver} from './PolyfillDriver'
import {Driver} from './Driver'
import {MemoryStorage} from './MemoryStorage'
import {CookieStorage} from './CookieStorage'

export const LOCAL = new PollyfillDriver(localStorage)
export const SESSION = new PollyfillDriver(sessionStorage)
export const MEMORY = new PollyfillDriver(new MemoryStorage())
export const COOKIE = new Driver(new CookieStorage())

export const DRIVERS = {
  LOCAL,
  SESSION,
  MEMORY,
  COOKIE
}
