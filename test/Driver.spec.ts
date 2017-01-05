import {determineDriver, DRIVERS} from 'Driver'
import {Locker} from 'Locker'
import {initTestBed} from './testHelpers'


describe('Driver.determineDriver', () => {
    beforeEach(() => initTestBed())

    describe('Single driver type', () => {
        beforeEach(() => {
            spyOn(DRIVERS.LOCAL, 'isSupported').and.callFake(() => false)
            spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => true)
        })

        it('should default to DRIVERS.MEMORY if driver is not supported', () => {
            let locker = new Locker({defaultDriverType: DRIVERS.LOCAL})
            expect(locker.driver).toEqual(DRIVERS.MEMORY)
        })

        it('should set supported DRIVERS.COOKIE correctly', () => {
            let locker = new Locker({defaultDriverType: DRIVERS.COOKIE})
            expect(locker.driver).toEqual(DRIVERS.COOKIE)
        })

        it('should default to DRIVERS.MEMORY when trying to switch drivers', () => {
            let locker = new Locker({defaultDriverType: DRIVERS.COOKIE})

            // current driver is DRIVERS.COOKIE
            expect(locker.driver).toEqual(DRIVERS.COOKIE)

            // switching driver to unsupported DRIVERS.LOCAL
            expect(locker.useDriver(DRIVERS.LOCAL).driver).toEqual(DRIVERS.MEMORY)
        })
    })

    describe('Fallback drivers', () => {
        beforeEach(() => {
            spyOn(DRIVERS.LOCAL, 'isSupported').and.callFake(() => false)
            spyOn(DRIVERS.SESSION, 'isSupported').and.callFake(() => true)
        })

        it('should set DRIVERS.MEMORY correctly when there is an empty Array', () => {
            let locker = new Locker({defaultDriverType: []})
            expect(locker.driver).toEqual(DRIVERS.MEMORY)
        })

        it('should set single-item Array with supported DRIVERS.COOKIE correctly', () => {
            spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => true)

            let locker = new Locker({defaultDriverType: [DRIVERS.COOKIE]})
            expect(locker.driver).toEqual(DRIVERS.COOKIE)
        })

        it('should set DRIVERS.COOKIE correctly since it comes before DRIVERS.SESSION', () => {
            let locker = new Locker({defaultDriverType:
                [DRIVERS.LOCAL, DRIVERS.COOKIE, DRIVERS.SESSION]})
            expect(locker.driver).toEqual(DRIVERS.COOKIE)
        })

        it('should set DRIVERS.MEMORY correctly when there is no supported driver in Array', () => {
            spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => false)

            let locker = new Locker({defaultDriverType:
                [DRIVERS.LOCAL, DRIVERS.COOKIE]})
            expect(locker.driver).toEqual(DRIVERS.MEMORY)
        })

        it('should switch drivers correctly', () => {
            spyOn(DRIVERS.COOKIE, 'isSupported').and.callFake(() => false)
            let locker = new Locker({defaultDriverType: [DRIVERS.MEMORY]})

            // current driver is DRIVERS.MEMORY
            expect(locker.driver).toEqual(DRIVERS.MEMORY)

            // switching driver to supported DRIVERS.SESSION
            expect(locker.useDriver([
                DRIVERS.LOCAL, DRIVERS.COOKIE, DRIVERS.SESSION]).driver).toEqual(DRIVERS.SESSION)

            // switching driver to unsupported DRIVERS.LOCAL and DRIVERS.COOKIE
            expect(locker.useDriver([DRIVERS.LOCAL, DRIVERS.COOKIE]).driver).toEqual(DRIVERS.MEMORY)
        })
    })
})
