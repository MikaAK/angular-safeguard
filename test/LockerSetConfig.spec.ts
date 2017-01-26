import {Locker} from '../src/Locker'
import {DRIVERS} from '../src/DriverTypes'

import {TestDriverSetConfig} from './TestDriverSetConfig'
import {initTestBed} from './testHelpers'

describe('Locker Set Config', function() {
  TestDriverSetConfig('MemoryDriver', DRIVERS.MEMORY)
  TestDriverSetConfig('SessionDriver', DRIVERS.SESSION)
  TestDriverSetConfig('LocalDriver', DRIVERS.LOCAL)
  TestDriverSetConfig('CookieDriver', DRIVERS.COOKIE)
})
