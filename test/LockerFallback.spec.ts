import {DRIVERS} from 'DriverTypes'
import {Locker, LockerConfig} from 'Locker'
import {initTestBed} from './testHelpers'

describe('LockerFallback', () => {
  const createDefaultDriverConfig = (defaultDriverType) => new LockerConfig(null, defaultDriverType)

  describe('Single driver', () => {
    beforeEach(() => {
      spyOn(DRIVERS.LOCAL, 'isSupported').and.callFake(() => false)
      spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => true)
    })

    it('should set DRIVERS.SESSION correctly when there it is null', () => {
      const locker = new Locker(createDefaultDriverConfig(null))

      expect(locker['driver']).toEqual(DRIVERS.SESSION)
    })

    it('should default to DRIVERS.MEMORY {defaultDriverType: if driver is not supported', () => {
      const locker = new Locker(createDefaultDriverConfig(DRIVERS.LOCAL))

      expect(locker['driver']).toEqual(DRIVERS.MEMORY)
    })

    it('should set supported DRIVERS.COOKIE correctly', () => {
      const locker = new Locker(createDefaultDriverConfig(DRIVERS.COOKIE))

      expect(locker['driver']).toEqual(DRIVERS.COOKIE)
    })

    it('should default to DRIVERS.MEMORY when trying to switch drivers', () => {
      const locker = new Locker(createDefaultDriverConfig(DRIVERS.COOKIE))

      expect(locker['driver']).toEqual(DRIVERS.COOKIE)
      expect(locker.useDriver(DRIVERS.LOCAL)['driver']).toEqual(DRIVERS.MEMORY)
    })
  })

  describe('Multiple drivers', () => {
    beforeEach(() => {
      spyOn(DRIVERS.LOCAL, 'isSupported').and.callFake(() => false)
      spyOn(DRIVERS.SESSION, 'isSupported').and.callFake(() => true)
    })

    it('should set single-item Array with supported DRIVERS.COOKIE correctly', () => {
      spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => true)

      const locker = new Locker(createDefaultDriverConfig([DRIVERS.COOKIE]))

      expect(locker['driver']).toEqual(DRIVERS.COOKIE)
    })

    it('should set DRIVERS.COOKIE correctly since it comes before DRIVERS.SESSION', () => {
      const locker = new Locker(createDefaultDriverConfig([
        DRIVERS.LOCAL,
        DRIVERS.COOKIE,
        DRIVERS.SESSION
      ]))

      expect(locker['driver']).toEqual(DRIVERS.COOKIE)
    })

    it('should set DRIVERS.MEMORY correctly when there is no supported driver in Array', () => {
      spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => false)

      const locker = new Locker(createDefaultDriverConfig([DRIVERS.LOCAL, DRIVERS.COOKIE]))
      expect(locker['driver']).toEqual(DRIVERS.MEMORY)
    })

    it('should switch drivers correctly', () => {
      spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => false)

      const locker = new Locker(createDefaultDriverConfig([DRIVERS.COOKIE]))
      const testOrder = [DRIVERS.LOCAL, DRIVERS.COOKIE]

      expect(locker['driver']).toEqual(DRIVERS.MEMORY)

      expect(locker.useDriver(testOrder.concat(DRIVERS.SESSION))['driver'])
        .toEqual(DRIVERS.SESSION)

      expect(locker.useDriver(testOrder)['driver'])
        .toEqual(DRIVERS.MEMORY)
    })
  })
})

