import {NgModule, ModuleWithProviders} from '@angular/core'

import {Locker, LockerConfig, LOCKER_USER_CONFIG, ILockerConfig} from './Locker'

@NgModule({
  providers: [Locker, LockerConfig]
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
