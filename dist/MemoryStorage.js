var _cache = new Map();
var getKeys = function () {
    var keys = [];
    for (var _i = 0, _a = _cache.keys(); _i < _a.length; _i++) {
        var key = _a[_i];
        keys.push(key);
    }
    return keys;
};
var MemoryStorage = (function () {
    function MemoryStorage() {
    }
    MemoryStorage.prototype.hasOwnProperty = function (key) {
        return _cache.has(key);
    };
    MemoryStorage.prototype.getItem = function (key) {
        return _cache.get(key);
    };
    MemoryStorage.prototype.setItem = function (key, value) {
        _cache.set(key, value);
    };
    MemoryStorage.prototype.removeItem = function (key) {
        return _cache.delete(key);
    };
    MemoryStorage.prototype.clear = function () {
        _cache.clear();
    };
    MemoryStorage.prototype.key = function (index) {
        return getKeys()[index];
    };
    Object.defineProperty(MemoryStorage.prototype, "length", {
        get: function () {
            return getKeys().length;
        },
        enumerable: true,
        configurable: true
    });
    return MemoryStorage;
})();
exports.MemoryStorage = MemoryStorage;
