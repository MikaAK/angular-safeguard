import {Injectable, Inject} from '@angular/core'

import {IStorageSetConfig, IDriverType} from './metadata'
import {Driver} from './Driver'
import {DRIVERS, LOCKER_DRIVER_TYPES} from './DriverTypes'
import {LockerConfig} from './LockerConfig'

@Injectable()
export class Locker {
  private driverFallback: DRIVERS | DRIVERS[]
  private namespace: string
  private separator: string

  constructor(@Inject(LOCKER_DRIVER_TYPES) private driverTypes: IDriverType[], private lockerConfig: LockerConfig) {
    this.setNamespace()
    this.setSeparator()
    this.setDriverFallback()
  }

  public setNamespace(namespace: string = this.lockerConfig.driverNamespace) {
    this.namespace = namespace
  }

  public setSeparator(separator: string = this.lockerConfig.namespaceSeparator) {
    this.separator = separator
  }

  public setDriverFallback(driverFallback: DRIVERS | DRIVERS[] = this.lockerConfig.driverFallback) {
    this.driverFallback = driverFallback
  }

  public set(type: DRIVERS, key: string, data: any, config?: IStorageSetConfig) {
    this._getDriver(type).set(this._makeKey(key), data, config)
  }

  public get(type: DRIVERS, key: string) {
    return this._getDriver(type).get(this._makeKey(key))
  }

  public has(type: DRIVERS, key: string) {
    return this._getDriver(type).has(this._makeKey(key))
  }

  public remove(type: DRIVERS, key: string) {
    this._getDriver(type).remove(this._makeKey(key))
  }

  public key(type: DRIVERS, index?: number) {
    return this._decodeKey(this._getDriver(type).key(index))
  }

  public clear(type: DRIVERS) {
    this._getDriver(type).clear()
  }

  private _makeKey(key: string): string {
    return this.namespace ? `${this.namespace}${this.separator}${key}` : key
  }

  private _decodeKey(key: string): string {
    if (this.namespace)
      return key.slice(this.namespace.length + this.separator.length)
    else
      return key
  }

  private _getDriver(type: DRIVERS): Driver {
    const askedDriver = this._getDriverType(type)

    if (askedDriver && askedDriver.storage.isSupported())
      return askedDriver.storage
    else
      return this._getFallbackDriverType().storage
  }

  private _getDriverType(type: DRIVERS): IDriverType {
    return this.driverTypes.find((driverType) => driverType.type === type)
  }

  private _getFallbackDriverType(): IDriverType {
    if (Array.isArray(this.driverFallback)) {
      return this.driverFallback
        .map((type) => this._getDriverType(type))
        .find((driverType) => driverType.storage.isSupported()) || this._getDriverType(DRIVERS.MEMORY)
    } else if (this.driverFallback) {
      const driverType = this._getDriverType(this.driverFallback)

      return driverType.storage.isSupported() ? driverType : this._getDriverType(DRIVERS.MEMORY)
    } else {
      return this._getDriverType(DRIVERS.MEMORY)
    }
  }
}
