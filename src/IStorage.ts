export interface IStorageSetConfig {
 secure?: boolean
 maxAge?: number
 domain?: string
 path?: string
 expires?: Date|string
}

export interface IStorage {
  length: number

  getItem(key: string): any
  setItem(key: string, data: any, config?: IStorageSetConfig): void
  removeItem(key: string): void
  clear(): void
  hasOwnProperty(key: string): boolean
  key(index: number): string
}
