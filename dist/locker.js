(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angular2-locker"] = factory();
	else
		root["angular2-locker"] = factory();
})(this, function() {
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

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Driver_1 = __webpack_require__(1);
	var MemoryStorage_1 = __webpack_require__(2);
	var DRIVERS = {
	    SESSION: new Driver_1.Driver(sessionStorage),
	    LOCAL: new Driver_1.Driver(localStorage),
	    MEMORY: new Driver_1.Driver(new MemoryStorage_1.MemoryStorage())
	};
	exports.DRIVERS = DRIVERS;

	var Locker = function () {
	    function Locker(_ref) {
	        var driverNamespace = _ref.driverNamespace;
	        var _ref$defaultDriverTyp = _ref.defaultDriverType;
	        var defaultDriverType = _ref$defaultDriverTyp === undefined ? DRIVERS.SESSION : _ref$defaultDriverTyp;

	        _classCallCheck(this, Locker);

	        this.setNamespace(driverNamespace);
	        this.setDriver(defaultDriverType);
	    }

	    _createClass(Locker, [{
	        key: 'setNamespace',
	        value: function setNamespace() {
	            var namespace = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	            this.namespace = namespace;
	        }
	    }, {
	        key: 'setDriver',
	        value: function setDriver(driver) {
	            this.driver = driver;
	            if (!this.driver.isSupported()) this.driver = DRIVERS.MEMORY;
	        }
	    }, {
	        key: 'set',
	        value: function set(key, data, expiry) {
	            this.driver.set(this._makeKey(key), data);
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            return this.driver.get(this._makeKey(key));
	        }
	    }, {
	        key: 'has',
	        value: function has(key) {
	            return this.driver.has(this._makeKey(key));
	        }
	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            this.driver.remove(this._makeKey(key));
	        }
	    }, {
	        key: 'key',
	        value: function key(index) {
	            return this.driver.key(index);
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.driver.clear();
	        }
	    }, {
	        key: '_makeKey',
	        value: function _makeKey(key) {
	            return this.namespace + ':' + key;
	        }
	    }]);

	    return Locker;
	}();

	Locker.DRIVERS = DRIVERS;
	exports.Locker = Locker;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LOCKER_TEST_KEY = 'LOCKER_TEST_KEY';
	var convertToJSON = function convertToJSON(data) {
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
	            return convertToJSON(this.storage.getItem(key));
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

/***/ }
/******/ ])
});
;