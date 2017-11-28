import {inject} from '@angular/core/testing'

import {Locker} from '../src/Locker'
import {DRIVERS} from '../src/DriverTypes'

import {TestDriver} from './TestDriver'
import {initTestBed} from './testHelpers'

describe('Locker', function() {
  const TEST_DATA = {
    key: 'key',
    value: 'value'
  }

  before(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  afterEach(() => sessionStorage.clear())

  describe('With Default Config', function() {
    beforeEach(() => initTestBed())

    it('initializes in angular2', inject([Locker], function(locker: Locker) {
      locker.set(DRIVERS.SESSION, TEST_DATA.key, TEST_DATA.value)

      assert(locker.has(DRIVERS.SESSION, TEST_DATA.key))
      assert(locker.get(DRIVERS.SESSION, TEST_DATA.key) === TEST_DATA.value)
      assert(locker.key(DRIVERS.SESSION) === TEST_DATA.key)
    }))
  })

  describe('#setNamespace', function() {
    beforeEach(() => initTestBed())

    beforeEach(inject([Locker], function(locker: Locker) {
      locker.setNamespace('test')
    }))

    it('can take in a custom namespace', inject([Locker], function(locker: Locker) {
      locker.set(DRIVERS.SESSION, TEST_DATA.key, TEST_DATA.value)

      assert(/^test/.test(sessionStorage.key(0)))
    }))

    it('can be passed undefined and uses default namespace', inject([Locker], function(locker: Locker) {
      locker.setNamespace()
      locker.set(DRIVERS.SESSION, TEST_DATA.key, TEST_DATA.value)

      assert(sessionStorage.key(0) === TEST_DATA.key)
    }))
  })

  describe('#setSeperator', function() {
    const NAMESPACE = 'test'

    beforeEach(() => initTestBed())

    beforeEach(inject([Locker], function(locker: Locker) {
      locker.setNamespace(NAMESPACE)
      locker.setSeparator('-')
    }))

    it('can take in a custom seperator', inject([Locker], function(locker: Locker) {
      locker.set(DRIVERS.SESSION, TEST_DATA.key, TEST_DATA.value)

      assert(sessionStorage.key(0) === `${NAMESPACE}-${TEST_DATA.key}`)
    }))

    it('can be passed undefined and uses default seperator', inject([Locker], function(locker: Locker) {
      locker.setSeparator()
      locker.set(DRIVERS.SESSION, TEST_DATA.key, TEST_DATA.value)

      assert(sessionStorage.key(0) === `${NAMESPACE}:${TEST_DATA.key}`)
    }))
  })

  TestDriver('MemoryDriver', DRIVERS.MEMORY)
  TestDriver('SessionDriver', DRIVERS.SESSION)
  TestDriver('LocalDriver', DRIVERS.LOCAL)
  TestDriver('CookieDriver', DRIVERS.COOKIE)
})
