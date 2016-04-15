(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular2/core"));
	else if(typeof define === 'function' && define.amd)
		define(["angular2/core"], factory);
	else if(typeof exports === 'object')
		exports["angular2-locker"] = factory(require("angular2/core"));
	else
		root["angular2-locker"] = factory(root["angular2/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Driver_1 = __webpack_require__(1);
	exports.Driver = Driver_1.Driver;
	var Locker_1 = __webpack_require__(2);
	exports.Locker = Locker_1.Locker;
	exports.DRIVERS = Locker_1.DRIVERS;
	exports.LockerConfig = Locker_1.LockerConfig;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LOCKER_TEST_KEY = 'LOCKER_TEST_KEY';
	var convertFromJSON = function convertFromJSON(data) {
	    if (typeof data !== 'string') return data;else {
	        try {
	            return JSON.parse(data);
	        } catch (e) {
	            return data;
	        }
	    }
	};

	var Driver = function () {
	    function Driver(storage) {
	        _classCallCheck(this, Driver);

	        this.storage = storage;
	    }

	    _createClass(Driver, [{
	        key: 'set',
	        value: function set(key, data) {
	            this.storage.setItem(key, (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? JSON.stringify(data) : data);
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            return convertFromJSON(this.storage.getItem(key));
	        }
	    }, {
	        key: 'has',
	        value: function has(key) {
	            return this.storage.hasOwnProperty(key);
	        }
	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            this.storage.removeItem(key);
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.storage.clear();
	        }
	    }, {
	        key: 'key',
	        value: function key() {
	            var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	            return this.storage.key(index);
	        }
	    }, {
	        key: 'isSupported',
	        value: function isSupported() {
	            try {
	                this.set(LOCKER_TEST_KEY, LOCKER_TEST_KEY);
	                this.get(LOCKER_TEST_KEY);
	                this.remove(LOCKER_TEST_KEY);
	            } catch (e) {
	                if (false) console.error(e);
	                return false;
	            }
	            return true;
	        }
	    }]);

	    return Driver;
	}();

	exports.Driver = Driver;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = undefined && undefined.__param || function (paramIndex, decorator) {
	    return function (target, key) {
	        decorator(target, key, paramIndex);
	    };
	};
	var core_1 = __webpack_require__(3);
	var Driver_1 = __webpack_require__(1);
	var MemoryStorage_1 = __webpack_require__(4);
	var CookieStorage_1 = __webpack_require__(5);
	exports.DRIVERS = {
	    LOCAL: new Driver_1.Driver(localStorage),
	    SESSION: new Driver_1.Driver(sessionStorage),
	    MEMORY: new Driver_1.Driver(new MemoryStorage_1.MemoryStorage()),
	    COOKIE: new Driver_1.Driver(new CookieStorage_1.CookieStorage())
	};
	var AbstractLockerConfig = function AbstractLockerConfig() {
	    _classCallCheck(this, AbstractLockerConfig);
	};
	AbstractLockerConfig = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], AbstractLockerConfig);
	exports.AbstractLockerConfig = AbstractLockerConfig;
	var LockerConfig = function LockerConfig() {
	    var driverNamespace = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var defaultDriverType = arguments.length <= 1 || arguments[1] === undefined ? exports.DRIVERS.SESSION : arguments[1];

	    _classCallCheck(this, LockerConfig);

	    this.driverNamespace = driverNamespace;
	    this.defaultDriverType = defaultDriverType;
	};
	LockerConfig = __decorate([core_1.Injectable(), __param(0, core_1.Optional()), __param(1, core_1.Optional()), __metadata('design:paramtypes', [String, Driver_1.Driver])], LockerConfig);
	exports.LockerConfig = LockerConfig;
	var Locker_1 = void 0;
	var Locker = Locker_1 = function () {
	    function Locker(_ref) {
	        var driverNamespace = _ref.driverNamespace;
	        var defaultDriverType = _ref.defaultDriverType;

	        _classCallCheck(this, Locker);

	        this.setNamespace(driverNamespace);
	        this.driver = defaultDriverType.isSupported() ? defaultDriverType : exports.DRIVERS.MEMORY;
	    }

	    _createClass(Locker, [{
	        key: "setNamespace",
	        value: function setNamespace() {
	            var namespace = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	            this.namespace = namespace;
	        }
	    }, {
	        key: "useDriver",
	        value: function useDriver(driver) {
	            return new Locker_1({
	                defaultDriverType: driver.isSupported() ? driver : exports.DRIVERS.MEMORY,
	                driverNamespace: this.namespace
	            });
	        }
	    }, {
	        key: "set",
	        value: function set(key, data, expiry) {
	            if (expiry) console.warn('Expiry is not implimented yet');
	            this.driver.set(this._makeKey(key), data);
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this.driver.get(this._makeKey(key));
	        }
	    }, {
	        key: "has",
	        value: function has(key) {
	            return this.driver.has(this._makeKey(key));
	        }
	    }, {
	        key: "remove",
	        value: function remove(key) {
	            this.driver.remove(this._makeKey(key));
	        }
	    }, {
	        key: "key",
	        value: function key(index) {
	            return this.driver.key(index);
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.driver.clear();
	        }
	    }, {
	        key: "_makeKey",
	        value: function _makeKey(key) {
	            return this.namespace ? this.namespace + ":" + key : key;
	        }
	    }]);

	    return Locker;
	}();
	Locker.DRIVERS = exports.DRIVERS;
	Locker = Locker_1 = __decorate([core_1.Injectable(), __param(0, core_1.Optional()), __metadata('design:paramtypes', [LockerConfig])], Locker);
	exports.Locker = Locker;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _cache = new Map();
	var getKeys = function getKeys() {
	    var keys = [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = _cache.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            keys.push(key);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return keys;
	};

	var MemoryStorage = function () {
	    function MemoryStorage() {
	        _classCallCheck(this, MemoryStorage);
	    }

	    _createClass(MemoryStorage, [{
	        key: "hasOwnProperty",
	        value: function hasOwnProperty(key) {
	            return _cache.has(key);
	        }
	    }, {
	        key: "getItem",
	        value: function getItem(key) {
	            return _cache.get(key);
	        }
	    }, {
	        key: "setItem",
	        value: function setItem(key, value) {
	            _cache.set(key, value);
	        }
	    }, {
	        key: "removeItem",
	        value: function removeItem(key) {
	            _cache.delete(key);
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            _cache.clear();
	        }
	    }, {
	        key: "key",
	        value: function key(index) {
	            return getKeys()[index];
	        }
	    }, {
	        key: "length",
	        get: function get() {
	            return getKeys().length;
	        }
	    }]);

	    return MemoryStorage;
	}();

	exports.MemoryStorage = MemoryStorage;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cookie_1 = __webpack_require__(6);

	var CookieStorage = function () {
	    function CookieStorage() {
	        _classCallCheck(this, CookieStorage);
	    }

	    _createClass(CookieStorage, [{
	        key: "hasOwnProperty",
	        value: function hasOwnProperty(key) {
	            return Cookie_1.Cookie.get(key);
	        }
	    }, {
	        key: "getItem",
	        value: function getItem(key) {
	            return Cookie_1.Cookie.get(key);
	        }
	    }, {
	        key: "setItem",
	        value: function setItem(key, value) {
	            Cookie_1.Cookie.set(key, value, {});
	        }
	    }, {
	        key: "removeItem",
	        value: function removeItem(key) {
	            Cookie_1.Cookie.remove(key);
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            Object.keys(Cookie_1.Cookie.getAll()).forEach(function (key) {
	                return Cookie_1.Cookie.remove(key);
	            });
	        }
	    }, {
	        key: "key",
	        value: function key(index) {
	            var cookies = Object.keys(Cookie_1.Cookie.getAll());
	            return cookies[index];
	        }
	    }, {
	        key: "length",
	        get: function get() {
	            return Object.keys(Cookie_1.Cookie.getAll()).length;
	        }
	    }]);

	    return CookieStorage;
	}();

	exports.CookieStorage = CookieStorage;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var COOKIE_SEP = '; ';
	// Convenience
	var encode = encodeURIComponent;
	var decode = decodeURIComponent;

	var Cookie = function () {
	    function Cookie() {
	        _classCallCheck(this, Cookie);
	    }

	    _createClass(Cookie, null, [{
	        key: 'getAll',
	        value: function getAll() {
	            return document.cookie.split(COOKIE_SEP).filter(function (value) {
	                return !!value;
	            }).map(function (items) {
	                return items.split('=');
	            }).reduce(function (res, _ref) {
	                var _ref2 = _slicedToArray(_ref, 2);

	                var key = _ref2[0];
	                var value = _ref2[1];
	                return res[decode(key)] = decode(value), res;
	            }, {});
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            return this.getAll()[key];
	        }
	    }, {
	        key: 'set',
	        value: function set(key, value, _ref3) {
	            var secure = _ref3.secure;
	            var maxAge = _ref3.maxAge;
	            var domain = _ref3.domain;
	            var expires = _ref3.expires;

	            var cookie = encode(key) + '=' + encode(value);
	            if (secure) cookie += ';secure';
	            if (!isNaN(maxAge)) cookie += ';max-age=' + maxAge;
	            if (domain) cookie += ';domain=' + domain;
	            if (expires) cookie += ';expires=' + expires.toUTCString();
	            document.cookie = cookie;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            this.set(key, this.get(key), { maxAge: 0 });
	        }
	    }]);

	    return Cookie;
	}();

	exports.Cookie = Cookie;

/***/ }
/******/ ])
});
;