import {NgModule, ModuleWithProviders} from '@angular/core'

import {Locker, LockerConfig} from './Locker'

@NgModule({
  providers: [Locker, LockerConfig]
})
export class LockerModule {
  public static forRoot() {
    return {
      ngModule: LockerModule,
      providers: [Locker, LockerConfig]
    }
  }

  public static withConfig(lockerConfig?: LockerConfig): ModuleWithProviders {
    const config = {
      provide: LockerConfig,
      useFactory: () => lockerConfig
    }

    return {
      ngModule: LockerModule,
      providers: [config, Locker]
    }
  }
}
