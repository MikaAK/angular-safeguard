import {Driver} from './Driver'
import {serializeDataToString, convertFromJSON, isExpired} from './helpers'
import {IStorageSetConfig} from './IStorage'

// This driver is a special driver to handle expiry and other options (similar to cookies)
export class PollyfillDriver extends Driver {
  public set(key: string, data: any, config?: IStorageSetConfig): void {
    this.storage.setItem(key, serializeDataToString({data, config}))
  }

  public get(key: string): any {
    this._checkExpiry(key)

    const data = convertFromJSON(this.storage.getItem(key))

    return (data && Reflect.has(data, 'data')) ? data.data : data
  }

  public has(key: string): boolean {
    this._checkExpiry(key)

    return this.storage.hasOwnProperty(key)
  }

  public key(index = 0): string {
    const key = this.storage.key(index)

    this._checkExpiry(key)

    return this.storage.key(index)
  }

  private _checkExpiry(key) {
    const data = convertFromJSON(this.storage.getItem(key))

    if (data && isExpired(data))
      this.remove(key)
  }
}
