import {provide} from '@angular/core'
import {it, inject, beforeEachProviders} from '@angular/core/testing'
import {TestDriver} from './TestDriver'
import {DRIVERS, Locker, LockerConfig} from '../src/Locker'

describe('Locker', function() {
  describe('With Default Config', function() {
    beforeEachProviders(() => [LockerConfig, Locker])

    it('initializes in angular2', inject([Locker], function(locker: Locker) {
      const TEST_DATA = {
        key: 'key',
        value: 'value'
      }

      locker.set(TEST_DATA.key, TEST_DATA.value)
      expect(locker.has(TEST_DATA.key)).toBeTruthy()
      expect(locker.get(TEST_DATA.key)).toEqual(TEST_DATA.value)
      expect(locker.key()).toEqual(TEST_DATA.key)
      debugger
    }))
  })

  describe('With Unsupported driver', function() {
    beforeEachProviders(function() {
      spyOn(DRIVERS.LOCAL, 'isSupported').and.callFake(() => false)
      spyOn(DRIVERS.SESSION, 'isSupported').and.callFake(() => false)

      return [
        provide(LockerConfig, {
          useValue: new LockerConfig(null, DRIVERS.LOCAL)
        }), 
        Locker
      ]
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
