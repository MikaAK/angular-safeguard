import {NgModule, ModuleWithProviders} from '@angular/core'

import {Locker} from './Locker'
import {LockerConfig, USER_CONFIG_PROVIDER, LOCKER_USER_CONFIG} from './LockerConfig'
import {DRIVER_TYPES_PROVIDERS} from './DriverTypes'
import {ILockerConfig} from './metadata'

@NgModule({
  providers: [
    Locker,
    LockerConfig,
    ...DRIVER_TYPES_PROVIDERS,
    USER_CONFIG_PROVIDER
  ]
})
export class LockerModule {
  public static withConfig(userConfig: ILockerConfig): ModuleWithProviders<ILockerConfig> {
    return {
      ngModule: LockerModule,
      providers: [Locker, LockerConfig, ...DRIVER_TYPES_PROVIDERS, {
        provide: LOCKER_USER_CONFIG,
        useValue: userConfig
      }]
    }
  }
}
