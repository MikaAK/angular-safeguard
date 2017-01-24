import {PollyfillDriver} from './PolyfillDriver'
import {Driver} from './Driver'
import {MemoryStorage} from './MemoryStorage'
import {CookieStorage} from './CookieStorage'

export const DRIVERS = {
  LOCAL: new PollyfillDriver(localStorage),
  SESSION: new PollyfillDriver(sessionStorage),
  MEMORY: new PollyfillDriver(new MemoryStorage()),
  COOKIE: new Driver(new CookieStorage())
}
