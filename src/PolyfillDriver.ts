import {Driver} from './Driver'
import {serializeDataToString, convertFromJSON, isExpired} from './helpers'
import {IStorageSetConfig, ICustomStorage, IStorage} from './metadata'

// This driver is a special driver to handle expiry and other options (similar to cookies)
// stores data as {data: myData, config: {expiry: new Date()}}
export class PollyfillDriver extends Driver {
  constructor(public storage: IStorage) {
    super(storage)
  }

  public set(key: string, data: any, config?: IStorageSetConfig): void {
    this.storage.setItem(key, serializeDataToString({data, config}))
  }

  public get(key: string): any {
    this._checkExpiry(key)

    const data = convertFromJSON(this.storage.getItem(key))

    return (data && data.data) ? data.data : data
  }

  public has(key: string): boolean {
    this._checkExpiry(key)

    const storage = <ICustomStorage>this.storage

    return storage.hasItem ? storage.hasItem(key) : this.storage.hasOwnProperty(key)
  }

  public key(index = 0): string {
    const key = this.storage.key(index)

    this._checkExpiry(key)

    return this.storage.key(index)
  }

  private _checkExpiry(key: string) {
    const data = convertFromJSON(this.storage.getItem(key))

    if (data && isExpired(data))
      this.remove(key)
  }
}
