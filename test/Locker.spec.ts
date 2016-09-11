import {inject} from '@angular/core/testing'
import {TestDriver} from './TestDriver'
import {DRIVERS} from 'Driver'
import {Locker} from 'Locker'
import {initTestBed} from './testHelpers'

describe('Locker', function() {
  beforeEach(() => initTestBed())
  afterEach(() => sessionStorage.clear())

  describe('With Default Config', function() {
    it('initializes in angular2', inject([Locker], function(locker: Locker) {
      const TEST_DATA = {
        key: 'key',
        value: 'value'
      }

      locker.set(TEST_DATA.key, TEST_DATA.value)

      expect(locker.has(TEST_DATA.key)).toBeTruthy()
      expect(locker.get(TEST_DATA.key)).toEqual(TEST_DATA.value)
      expect(locker.key()).toEqual(TEST_DATA.key)
    }))
  })

  describe('With Unsupported driver', function() {
    beforeEach(function() {
      spyOn(DRIVERS.LOCAL, 'isSupported').and.callFake(() => false)
      spyOn(DRIVERS.SESSION, 'isSupported').and.callFake(() => false)
      spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => false)
    })

    it('backs up to MemoryStorage', inject([Locker], function(locker: Locker) {
      expect(locker['driver']).toEqual(DRIVERS.MEMORY)
    }))

    it('gives memory driver if trying to switch drivers', inject([Locker], function(locker: Locker) {
      expect(locker.useDriver(DRIVERS.LOCAL)['driver']).toEqual(DRIVERS.MEMORY)
    }))
  })

  TestDriver('MemoryDriver', DRIVERS.MEMORY)
  TestDriver('SessionDriver', DRIVERS.SESSION)
  TestDriver('LocalDriver', DRIVERS.LOCAL)
  TestDriver('CookieDriver', DRIVERS.COOKIE)
})
