declare module 'angular2-locker/src/IStorage' {
	interface IStorage {
	    length: number;
	    getItem(key: string): any;
	    setItem(key: string, data: any): void;
	    removeItem(key: string): void;
	    clear(): void;
	    hasOwnProperty(key: string): boolean;
	    key(index: number): string;
	}
	export { IStorage };

}
declare module 'angular2-locker/src/Driver' {
	import { IStorage } from 'angular2-locker/src/IStorage'; class Driver {
	    private storage;
	    constructor(storage: IStorage);
	    set(key: string, data: any): void;
	    get(key: string): any;
	    has(key: string): boolean;
	    remove(key: string): void;
	    clear(): void;
	    key(index?: number): string;
	    isSupported(): boolean;
	}
	export { Driver };

}
declare module 'angular2-locker/src/MemoryStorage' {
	import { IStorage } from 'angular2-locker/src/IStorage';
	export class MemoryStorage implements IStorage {
	    hasOwnProperty(key: any): boolean;
	    getItem(key: any): any;
	    setItem(key: any, value: any): void;
	    removeItem(key: any): void;
	    clear(): void;
	    key(index: any): any;
	    length: number;
	}

}
declare module 'angular2-locker/src/Locker' {
	import { Driver } from 'angular2-locker/src/Driver'; const DRIVERS: {
	    SESSION: Driver;
	    LOCAL: Driver;
	    MEMORY: Driver;
	};
	export { DRIVERS };
	export class Locker {
	    static DRIVERS: {
	        SESSION: Driver;
	        LOCAL: Driver;
	        MEMORY: Driver;
	    };
	    private driver;
	    private namespace;
	    constructor({driverNamespace, defaultDriverType}: {
	        driverNamespace: any;
	        defaultDriverType?: Driver;
	    });
	    setNamespace(namespace?: string): void;
	    setDriver(driver: Driver): void;
	    set(key: any, data: any, expiry: any): void;
	    get(key: any): any;
	    has(key: any): boolean;
	    remove(key: any): void;
	    key(index: any): string;
	    clear(): void;
	    private _makeKey(key);
	}

}


