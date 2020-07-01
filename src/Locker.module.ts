import {NgModule, ModuleWithProviders} from '@angular/core'

import {Locker} from './Locker'
import {LockerConfig, LOCKER_USER_CONFIG} from './LockerConfig'
import {DRIVER_TYPES_PROVIDERS} from './DriverTypes'
import {ILockerConfig} from './metadata'

@NgModule()
export class LockerModule {
  public static withConfig(userConfig: ILockerConfig): ModuleWithProviders {
    return {
      ngModule: LockerModule,
      providers: [Locker, LockerConfig, ...DRIVER_TYPES_PROVIDERS, {
        provide: LOCKER_USER_CONFIG,
        useValue: userConfig
      }]
    }
  }
}
