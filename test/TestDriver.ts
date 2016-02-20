import {
  it,
  inject,
  beforeEachProviders,
  afterEach
} from 'angular2/testing'

import {provide} from 'angular2/core'

import {Driver} from '../src/Driver'
import {Locker, DRIVERS} from '../src/Locker'

const CUSTOM_NAMESPACE = 'angular2-locker'
const SEPERATOR = ':'

const TestDriver = function(driverName, driver: Driver) {
  describe(driverName, function() {
    describe('With DefaultDriverType', function() {
      const TEST_KEY = `${CUSTOM_NAMESPACE}-${Math.random() * 1000}`

      beforeEachProviders(() => [provide(Locker, {useValue: new Locker({defaultDriverType: driver})})])
      afterEach(() => driver.clear())

      it(`sets driver to ${driverName}`, inject([Locker], function(locker: Locker) {
        expect(locker['driver']).toEqual(driver)
      }))


      it('sets key with string value into storage', inject([Locker], function(locker: Locker) {
        const TEST_VALUE = 'TEST'

        locker.set(TEST_KEY, TEST_VALUE)

        expect(locker.get(TEST_KEY)).toEqual(TEST_VALUE)
      }))

      it('sets key with object value into storage', inject([Locker], function(locker: Locker) {
        const TEST_VALUE = {
          object1: 'villa',
          myObject: 'Test'
        }

        locker.set(TEST_KEY, TEST_VALUE)

        expect(locker.get(TEST_KEY)).toEqual(TEST_VALUE)
      }))

      it('removes data from storage with .remove', inject([Locker], function(locker: Locker) {
        const TEST_VALUE = 'TEST'

        locker.set(TEST_KEY, TEST_VALUE)

        locker.remove(TEST_KEY)
        expect(locker.get(TEST_KEY)).not.toEqual(TEST_VALUE)
      }))

      it('clears all data from the storage with .clear', inject([Locker], function(locker: Locker) {
        const TEST_VALUE = 'TEST',
              TEST_KEY_2 = `TEST_${TEST_KEY}`

        locker.set(TEST_KEY, TEST_VALUE)
        locker.set(TEST_KEY_2, TEST_VALUE)

        locker.clear()

        expect(locker.get(TEST_KEY)).not.toEqual(TEST_VALUE)
        expect(locker.get(TEST_KEY_2)).not.toEqual(TEST_VALUE)
      }))

      it('can fetch key by index', inject([Locker], function(locker: Locker) {
        var dummy = {
          key: 'TEST',
          data: `TEST-${Math.random() * 1000}`
        }

        locker.set(dummy.key, dummy.data)

        expect(locker.key()).toEqual(dummy.key)
      }))
    })

    describe('Custom Namespace', function() {
      beforeEachProviders(() => provide(Locker, {useValue: new Locker({driverNamespace: CUSTOM_NAMESPACE})}))

      it('uses namespace in keys', inject([Locker], function(locker: Locker) {
        var dummy = {
          key: 'TEST',
          data: `TEST-${Math.random() * 1000}`
        }

        locker.set(dummy.key, dummy.data)

        expect(locker.key()).toEqual(CUSTOM_NAMESPACE + SEPERATOR + dummy.key)
      }))
    })
  })
}

export {TestDriver}
