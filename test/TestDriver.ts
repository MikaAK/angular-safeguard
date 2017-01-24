import {inject} from '@angular/core/testing'
import {Driver} from 'Driver'
import {LockerConfig, Locker} from 'Locker'
import {initTestBed} from './testHelpers'

const CUSTOM_NAMESPACE = 'angular2-locker'
const SEPERATOR = ':'

const createLockerConfig = (defaultNamespace: string, driver?: Driver) => new LockerConfig(defaultNamespace, driver, SEPERATOR)

export const TestDriver = function(driverName, driver: Driver) {
  describe(driverName, function() {
    describe('With DefaultDriverType', function() {
      const TEST_KEY = `${CUSTOM_NAMESPACE}-${Math.random() * 1000}`
      var locker: Locker

      beforeEach(() => initTestBed(createLockerConfig('', driver)))
      afterEach(() => driver.clear())

      beforeEach(inject([Locker, LockerConfig], (lockerService) => locker = lockerService))

      it(`sets driver to ${driverName}`, () => {
        expect(locker['driver']).toEqual(driver)
      })


      it('sets key with string value into storage', () => {
        const TEST_VALUE = 'TEST'

        locker.set(TEST_KEY, TEST_VALUE)

        expect(locker.get(TEST_KEY)).toEqual(TEST_VALUE)
      })

      it('sets key with object value into storage', () => {
        const TEST_VALUE = {
          object1: 'villa',
          myObject: 'Test'
        }

        locker.set(TEST_KEY, TEST_VALUE)

        expect(locker.get(TEST_KEY)).toEqual(TEST_VALUE)
      })

      it('removes data from storage with .remove', () => {
        const TEST_VALUE = 'TEST'

        locker.set(TEST_KEY, TEST_VALUE)

        locker.remove(TEST_KEY)
        expect(locker.get(TEST_KEY)).not.toEqual(TEST_VALUE)
      })

      it('clears all data from the storage with .clear', () => {
        const TEST_VALUE = 'TEST',
              TEST_KEY_2 = `TEST_${TEST_KEY}`

        locker.set(TEST_KEY, TEST_VALUE)
        locker.set(TEST_KEY_2, TEST_VALUE)

        locker.clear()

        expect(locker.get(TEST_KEY)).not.toEqual(TEST_VALUE)
        expect(locker.get(TEST_KEY_2)).not.toEqual(TEST_VALUE)
      })

      it('can fetch key by index', () => {
        var dummy = {
          key: 'TEST',
          data: `TEST-${Math.random() * 1000}`
        }

        locker.set(dummy.key, dummy.data)

        expect(locker.key()).toEqual(dummy.key)
      })
    })

    describe('Custom Namespace', function() {
      beforeEach(() => initTestBed(createLockerConfig(CUSTOM_NAMESPACE)))

      it('when getting keys namespace is not included', inject([Locker, LockerConfig], (locker: Locker) => {
        var dummy = {
          key: 'TEST',
          data: `TEST-${Math.random() * 1000}`
        }

        locker.set(dummy.key, dummy.data)

        expect(locker.key()).toEqual(dummy.key)
      }))
    })
  })
}
