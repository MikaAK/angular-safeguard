import {NgModule, ModuleWithProviders} from '@angular/core'

import {Locker, LockerConfig, LOCKER_DEFAULT_CONFIG_PROVIDER, LOCKER_USER_CONFIG} from './Locker'
import {ILockerConfig} from './metadata'

@NgModule({
  providers: [
    Locker,
    LockerConfig,
    LOCKER_DEFAULT_CONFIG_PROVIDER
  ]
})
export class LockerModule {
  public static withConfig(userConfig: ILockerConfig): ModuleWithProviders {
    const config = {
      provide: LOCKER_USER_CONFIG,
      useValue: userConfig
    }

    return {
      ngModule: LockerModule,
      providers: [Locker, LockerConfig, config]
    }
  }
}
