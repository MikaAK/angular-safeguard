import {inject} from '@angular/core/testing'

import {DRIVERS} from '../src/DriverTypes'
import {Locker} from '../src/Locker'

import {initTestBed} from './testHelpers'

const CUSTOM_NAMESPACE = 'angular2-locker'
const SEPERATOR = ':'

const createLockerConfig = (driverNamespace: string) => ({
  driverNamespace,
  namespaceSeparator: SEPERATOR
})

export const TestDriver = function(driverName, driver: DRIVERS) {
  describe(driverName, function() {
    describe('With DefaultDriverType', function() {
      const TEST_KEY = `${CUSTOM_NAMESPACE}-${Math.random() * 1000}`
      var locker: Locker

      beforeEach(() => initTestBed())

      beforeEach(inject([Locker], (lockerService) => locker = lockerService))
      afterEach(() => locker.clear(driver))

      it('sets key with string value into storage', () => {
        const TEST_VALUE = 'TEST'

        locker.set(driver, TEST_KEY, TEST_VALUE)

        assert.deepEqual(locker.get(driver, TEST_KEY), TEST_VALUE)
      })

      it('sets key with object value into storage', () => {
        const TEST_VALUE = {
          object1: 'villa',
          myObject: 'Test'
        }

        locker.set(driver, TEST_KEY, TEST_VALUE)

        assert.deepEqual(locker.get(driver, TEST_KEY), TEST_VALUE)
      })

      it('removes data from storage with .remove', () => {
        const TEST_VALUE = 'TEST'

        locker.set(driver, TEST_KEY, TEST_VALUE)
        locker.remove(driver, TEST_KEY)

        assert.notDeepEqual(locker.get(driver, TEST_KEY), TEST_VALUE)
      })

      it('clears all data from the storage with .clear', () => {
        const TEST_VALUE = 'TEST',
              TEST_KEY_2 = `TEST_${TEST_KEY}`

        locker.set(driver, TEST_KEY, TEST_VALUE)
        locker.set(driver, TEST_KEY_2, TEST_VALUE)

        locker.clear(driver)

        assert.notDeepEqual(locker.get(driver, TEST_KEY), TEST_VALUE)
        assert.notDeepEqual(locker.get(driver, TEST_KEY_2), TEST_VALUE)
      })

      it('can fetch key by index', () => {
        var dummy = {
          key: 'TEST',
          data: `TEST-${Math.random() * 1000}`
        }

        locker.set(driver, dummy.key, dummy.data)

        assert(locker.key(driver) === dummy.key)
      })
    })

    describe('Custom Namespace', function() {
      beforeEach(() => initTestBed(createLockerConfig(CUSTOM_NAMESPACE)))

      it('when getting keys namespace is not included', inject([Locker], (locker: Locker) => {
        var dummy = {
          key: 'TEST',
          data: `TEST-${Math.random() * 1000}`
        }

        locker.set(driver, dummy.key, dummy.data)

        assert(locker.key(driver) === dummy.key)
      }))
    })
  })
}
