var LOCKER_TEST_KEY = 'LOCKER_TEST_KEY';
var convertToJSON = function (data) {
    if (typeof data !== 'string')
        return data;
    else {
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    }
};
var Driver = (function () {
    function Driver(storage) {
        this.storage = storage;
    }
    Driver.prototype.set = function (key, data) {
        this.storage.setItem(key, typeof data === 'object' ? JSON.stringify(data) : data);
    };
    Driver.prototype.get = function (key) {
        return convertToJSON(this.storage.getItem(key));
    };
    Driver.prototype.has = function (key) {
        return this.storage.hasOwnProperty(key);
    };
    Driver.prototype.remove = function (key) {
        this.storage.removeItem(key);
    };
    Driver.prototype.clear = function () {
        this.storage.clear();
    };
    Driver.prototype.key = function (index) {
        if (index === void 0) { index = 0; }
        return this.storage.key(index);
    };
    Driver.prototype.isSupported = function () {
        try {
            this.set(LOCKER_TEST_KEY, LOCKER_TEST_KEY);
            this.get(LOCKER_TEST_KEY);
            this.remove(LOCKER_TEST_KEY);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return Driver;
})();
exports.Driver = Driver;
