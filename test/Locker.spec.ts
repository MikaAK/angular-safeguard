import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing'
import {provide} from "angular2/core"

import {Locker} from '../src/Locker'

const CUSTOM_NAMESPACE = 'angular2-locker'
const SEPERATOR = ':'

describe('Locker', function() {
  describe('Default Config', function() {
   beforeEachProviders(() => [Locker])

   it('uses session cache', inject([Locker], function(locker: Locker) {
     expect(locker.driver).toEqual(Locker.DRIVERS.SESSION)
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

  describe('Session Cache', function() {
    beforeEachProviders(() => provide(Locker, {useValue: new Locker({defaultDriverType: Locker.DRIVERS.SESSION})}))
  })

  describe('Local Storage', function() {
    beforeEachProviders(() => provide(Locker, {useValue: new Locker({defaultDriverType: Locker.DRIVERS.LOCAL})}))
  })
})
