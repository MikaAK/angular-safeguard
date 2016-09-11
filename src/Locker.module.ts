import {NgModule, ModuleWithProviders} from '@angular/core'

import {Locker, LockerConfig} from './Locker'

@NgModule({
  providers: [Locker, LockerConfig]
})
export class LockerModule {
  public static forRoot(lockerConfig?: LockerConfig): ModuleWithProviders {
    const config = {
      provide: LockerConfig,
      useFactory: () => lockerConfig || new LockerConfig()
    }

    return {
      ngModule: LockerModule,
      providers: [config, Locker]
    }
  }
}
