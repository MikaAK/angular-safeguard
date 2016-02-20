interface IStorage {
  length: number

  getItem(key: string): any
  setItem(key: string, data: any, config?: any): void
  removeItem(key: string): void
  clear(): void
  hasOwnProperty(key: string): boolean
  key(index: number): string
}

export {IStorage}
