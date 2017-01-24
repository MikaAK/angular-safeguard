import {NgModule, ModuleWithProviders} from '@angular/core'

import {Locker, LockerConfig} from './Locker'
import {is} from './helpers'

@NgModule({
  providers: [Locker, LockerConfig]
})
export class LockerModule {
  public static forRoot(lockerConfig?: LockerConfig): ModuleWithProviders {
    const config = {
      provide: LockerConfig,
      useFactory: () => is(LockerConfig, lockerConfig) ? lockerConfig : new LockerConfig()
    }

    return {
      ngModule: LockerModule,
      providers: [Locker, config]
    }
  }
}
