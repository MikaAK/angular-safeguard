var Driver_1 = require('./Driver');
var MemoryStorage_1 = require('./MemoryStorage');
var LOCKER_TYPES = {
    SESSION: new Driver_1.Driver(sessionStorage),
    LOCAL: new Driver_1.Driver(localStorage),
    MEMORY: new Driver_1.Driver(new MemoryStorage_1.MemoryStorage())
};
var makeKey = function (locker, key) {
    return locker.namespace + ":" + key;
};
var Locker = (function () {
    function Locker() {
        this.DRIVERS = LOCKER_TYPES;
        this.setDriver(LOCKER_TYPES.SESSION);
    }
    Locker.prototype.setNamespace = function (namespace) {
        this.namespace = namespace;
    };
    Locker.prototype.setDriver = function (driver) {
        this.driver = driver;
        if (!this.driver.isSupported())
            this.driver = LOCKER_TYPES.MEMORY;
    };
    Locker.prototype.set = function (key, data, expiry) {
        this.driver.set(makeKey(this, key), data);
    };
    Locker.prototype.get = function (key) {
        return this.driver.get(makeKey(this, key));
    };
    Locker.prototype.has = function (key) {
        return this.driver.has(makeKey(this, key));
    };
    Locker.prototype.remove = function (key) {
        this.driver.remove(makeKey(this, key));
    };
    Locker.prototype.key = function (index) {
        return this.driver.key(index);
    };
    Locker.prototype.clear = function () {
        this.driver.clear();
    };
    return Locker;
})();
exports.Locker = Locker;
