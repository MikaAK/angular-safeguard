import {inject} from '@angular/core/testing'

import {Locker} from 'Locker'
import {DRIVERS} from 'DriverTypes'

import {TestDriver} from './TestDriver'
import {initTestBed} from './testHelpers'

describe('Locker', function() {
  const TEST_DATA = {
    key: 'key',
    value: 'value'
  }

  beforeAll(() => {
    sessionStorage.clear()
    localStorage.clear()
  })
  beforeEach(() => initTestBed())
  afterEach(() => sessionStorage.clear())

  describe('With Default Config', function() {
    it('initializes in angular2', inject([Locker], function(locker: Locker) {
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

  describe('#setNamespace', function() {
    beforeEach(inject([Locker], function(locker: Locker) {
      locker.setNamespace('test')
    }))

    it('can take in a custom namespace', inject([Locker], function(locker: Locker) {
      locker.set(TEST_DATA.key, TEST_DATA.value)

      expect(sessionStorage.key(0)).toMatch(/^test/)
    }))

    it('can be passed undefined and uses default namespace', inject([Locker], function(locker: Locker) {
      locker.setNamespace()
      locker.set(TEST_DATA.key, TEST_DATA.value)

      expect(sessionStorage.key(0)).toEqual(TEST_DATA.key)
    }))
  })

  describe('#setSeperator', function() {
    const NAMESPACE = 'test'

    beforeEach(inject([Locker], function(locker: Locker) {
      locker.setNamespace(NAMESPACE)
      locker.setSeparator('-')
    }))

    it('can take in a custom seperator', inject([Locker], function(locker: Locker) {
      locker.set(TEST_DATA.key, TEST_DATA.value)

      expect(sessionStorage.key(0)).toEqual(`${NAMESPACE}-${TEST_DATA.key}`)
    }))

    it('can be passed undefined and uses default seperator', inject([Locker], function(locker: Locker) {
      locker.setSeparator()
      locker.set(TEST_DATA.key, TEST_DATA.value)

      expect(sessionStorage.key(0)).toEqual(`${NAMESPACE}:${TEST_DATA.key}`)
    }))
  })

  TestDriver('MemoryDriver', DRIVERS.MEMORY)
  TestDriver('SessionDriver', DRIVERS.SESSION)
  TestDriver('LocalDriver', DRIVERS.LOCAL)
  TestDriver('CookieDriver', DRIVERS.COOKIE)
})
