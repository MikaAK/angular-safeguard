import {TestDriver} from './TestDriver'

import {DRIVERS} from '../src/Locker'

describe('Locker', function() {
  TestDriver('MemoryDriver', DRIVERS.MEMORY)
  TestDriver('SessionDriver', DRIVERS.SESSION)
  TestDriver('LocalDriver', DRIVERS.LOCAL)
})
