import {inject, TestBed} from '@angular/core/testing'

import {DRIVERS, LOCKER_DRIVER_TYPES} from '../src/DriverTypes'
import {Locker} from '../src/Locker'
import {LockerModule} from '../src/Locker.module'

describe('LockerFallback', () => {
  describe('Single driver', () => {
    var locker: Locker

    const localUnsupportedMock = {
      multi: true,
      provide: LOCKER_DRIVER_TYPES,
      useValue: {
        type: DRIVERS.LOCAL,
        storage: {isSupported: () => false}
      }
    }

    describe('With supported driver', function() {
      beforeEach(() => TestBed.configureTestingModule({
        providers: [
          LockerModule.withConfig({
            driverFallback: DRIVERS.LOCAL
          })
        ]
      }))

      it('should fallback to DRIVERS.LOCAL', inject([Locker], function(locker: Locker) {
        const {type} = locker['_getFallbackDriverType']()

        expect(type).toEqual(DRIVERS.LOCAL)
      }))
    })

    describe('With unsupported driver', function() {
      beforeEach(() => TestBed.configureTestingModule({
        providers: [
          localUnsupportedMock,
          LockerModule.withConfig({
            driverFallback: DRIVERS.LOCAL
          })
        ]
      }))

      it('should fallback to DRIVERS.MEMORY', function() {
        const {type} = locker['_getFallbackDriverType']()

        expect(type).toEqual(DRIVERS.MEMORY)
      })
    })
  })

  // describe('Multiple drivers', () => {
  //   var locker: Locker

  //   beforeEach(() => initTestBed({
  //     driverFallback: DRIVERS.COOKIE
  //   }))
  //   beforeEach(inject([Locker], (lockerService: Locker) => lockerService = locker))
  //   beforeEach(() => {
  //     spyOn(DRIVERS.LOCAL, 'isSupported').and.callFake(() => false)
  //     spyOn(DRIVERS.SESSION, 'isSupported').and.callFake(() => true)
  //   })

  //   it('should set single-item Array with supported DRIVERS.COOKIE correctly', () => {
  //     spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => true)

  //     const locker = new Locker(createDefaultDriverConfig([DRIVERS.COOKIE]))

  //     expect(locker['driver']).toEqual(DRIVERS.COOKIE)
  //   })

  //   it('should set DRIVERS.COOKIE correctly since it comes before DRIVERS.SESSION', () => {
  //     const locker = new Locker(createDefaultDriverConfig([
  //       DRIVERS.LOCAL,
  //       DRIVERS.COOKIE,
  //       DRIVERS.SESSION
  //     ]))

  //     expect(locker['driver']).toEqual(DRIVERS.COOKIE)
  //   })

  //   it('should set DRIVERS.MEMORY correctly when there is no supported driver in Array', () => {
  //     spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => false)

  //     const locker = new Locker(createDefaultDriverConfig([DRIVERS.LOCAL, DRIVERS.COOKIE]))
  //     expect(locker['driver']).toEqual(DRIVERS.MEMORY)
  //   })

  //   it('should switch drivers correctly', () => {
  //     spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => false)

  //     const locker = new Locker(createDefaultDriverConfig([DRIVERS.COOKIE]))
  //     const testOrder = [DRIVERS.LOCAL, DRIVERS.COOKIE]

  //     expect(locker['driver']).toEqual(DRIVERS.MEMORY)

  //     expect(locker.useDriver(testOrder.concat(DRIVERS.SESSION))['driver'])
  //       .toEqual(DRIVERS.SESSION)

  //     expect(locker.useDriver(testOrder)['driver'])
  //       .toEqual(DRIVERS.MEMORY)
  //   })
  // })
})

