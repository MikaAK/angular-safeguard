import {TestDriverSetConfig} from './TestDriverSetConfig'
import {DRIVERS, Locker, LockerConfig} from 'Locker'
import {initTestBed} from './testHelpers'

describe('Locker Set Config', function() {
  beforeEach(() => initTestBed())

  TestDriverSetConfig('MemoryDriver', DRIVERS.MEMORY)
  TestDriverSetConfig('SessionDriver', DRIVERS.SESSION)
  TestDriverSetConfig('LocalDriver', DRIVERS.LOCAL)
  TestDriverSetConfig('CookieDriver', DRIVERS.COOKIE)
})
