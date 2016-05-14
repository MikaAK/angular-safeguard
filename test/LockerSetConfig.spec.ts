import {provide} from '@angular/core'
import {it, inject, beforeEachProviders} from '@angular/core/testing'
import {TestDriver} from './TestDriver'
import {DRIVERS, Locker, LockerConfig} from '../src/Locker'

// describe('Locker Set Config', function() {
//   beforeEachProviders(() => [LockerConfig, Locker])
//   beforeEach(() => jasmine.clock().install())
//   afterEach(() => jasmine.clock().uninstall())

//   describe('Cookie Driver', function() {
//     it('can set expiry and have it expire at date', inject([Locker], function(locker: Locker) {
//       var cLocker = locker.useDriver(Locker.DRIVERS.COOKIE)

//       const EXPIRY = new Date(),
//             ADD_TIME = 10

//       EXPIRY.setHours(EXPIRY.getHours() + ADD_TIME)

//       jasmine.clock().mockDate(EXPIRY)

//       const DUMMY = {
//         key: 'hi',
//         data: 'bill',
//         config: {
//           expires: EXPIRY
//         }
//       }


//       cLocker.set(DUMMY.key, DUMMY.data, DUMMY.config)
//       expect(cLocker.get(DUMMY.key)).toEqual(DUMMY.data)
//       jasmine.clock().tick(ADD_TIME)
//       expect(cLocker.get(DUMMY.key)).toBeUndefined()
//     })
//   })
// })
