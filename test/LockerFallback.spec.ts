import {inject} from '@angular/core/testing'

import {DRIVERS, LOCKER_DRIVER_TYPES} from '../src/DriverTypes'
import {Locker} from '../src/Locker'
import {IDriverType} from '../src/metadata'

import {initTestBed, stubDriverSupport, resetDriverStubs, getFallbackDriverType} from './testHelpers'

describe('LockerFallback', () => {
  describe('Single driver', () => {
    describe('With supported driver', function() {
      beforeEach(() => initTestBed({
        driverFallback: DRIVERS.LOCAL
      }))

      it('should fallback to DRIVERS.LOCAL', inject([Locker], function(locker: Locker) {
        assert(getFallbackDriverType(locker) === DRIVERS.LOCAL)
      }))
    })

    describe('With unsupported driver', function() {
      beforeEach(() => initTestBed({driverFallback: DRIVERS.LOCAL}))
      afterEach(resetDriverStubs)

      it('should fallback to DRIVERS.MEMORY', inject([Locker, LOCKER_DRIVER_TYPES], function(locker: Locker, driverTypes: IDriverType[]) {
        stubDriverSupport(driverTypes, DRIVERS.LOCAL, false)
        stubDriverSupport(driverTypes, DRIVERS.SESSION, false)
        stubDriverSupport(driverTypes, DRIVERS.COOKIE, false)

        assert(getFallbackDriverType(locker) === DRIVERS.MEMORY)
      }))
    })
  })

  describe('Multiple drivers', () => {
    var locker: Locker,
        driverTypes: IDriverType[]

    beforeEach(() => initTestBed({
      driverFallback: DRIVERS.COOKIE
    }))

    beforeEach(inject([Locker, LOCKER_DRIVER_TYPES], (lockerService: Locker, driverTypesConfig: IDriverType[]) => {
      locker = lockerService
      driverTypes = driverTypesConfig

      stubDriverSupport(driverTypes, DRIVERS.LOCAL, false)
      stubDriverSupport(driverTypes, DRIVERS.SESSION, false)
      stubDriverSupport(driverTypes, DRIVERS.COOKIE, false)
    }))
    afterEach(resetDriverStubs)

    it('should set single-item Array with supported DRIVERS.COOKIE correctly', inject([Locker, LOCKER_DRIVER_TYPES], function(locker: Locker, driverTypes: IDriverType[]) {
      stubDriverSupport(driverTypes, DRIVERS.COOKIE, true)

      assert(getFallbackDriverType(locker) === DRIVERS.COOKIE)
    }))

    it('should set DRIVERS.COOKIE correctly since it comes before DRIVERS.SESSION', inject([Locker, LOCKER_DRIVER_TYPES], function(locker: Locker) {
      stubDriverSupport(driverTypes, DRIVERS.SESSION, true)
      stubDriverSupport(driverTypes, DRIVERS.COOKIE, true)

      locker.setDriverFallback([
        DRIVERS.LOCAL,
        DRIVERS.COOKIE,
        DRIVERS.SESSION
      ])

      assert(getFallbackDriverType(locker) === DRIVERS.COOKIE)
    }))

    it('should set DRIVERS.MEMORY correctly when there is no supported driver in Array', inject([Locker, LOCKER_DRIVER_TYPES], function(locker: Locker) {
      locker.setDriverFallback([
        DRIVERS.LOCAL,
        DRIVERS.COOKIE
      ])

      assert(getFallbackDriverType(locker) === DRIVERS.MEMORY)
    }))
  })
})
