(function webpackUniversalModuleDefinition (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') { module.exports = factory(); } else if (typeof define === 'function' && define.amd) { define([], factory); } else if (typeof exports === 'object') { exports.memory = factory(); } else { root.feathers = root.feathers || {}, root.feathers.memory = factory(); }
})(window, function () {
  return /******/ (function (modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__ (moduleId) {
      /******/
      /******/ 		// Check if module is in cache
      /******/ 		if (installedModules[moduleId]) {
        /******/ 			return installedModules[moduleId].exports;
        /******/ 		}
      /******/ 		// Create a new module (and put it into the cache)
      /******/ 		var module = installedModules[moduleId] = {
        /******/ 			i: moduleId,
        /******/ 			l: false,
        /******/ 			exports: {}
        /******/ 		};
      /******/
      /******/ 		// Execute the module function
      /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ 		// Flag the module as loaded
      /******/ 		module.l = true;
      /******/
      /******/ 		// Return the exports of the module
      /******/ 		return module.exports;
      /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function (exports, name, getter) {
      /******/ 		if (!__webpack_require__.o(exports, name)) {
        /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/ 		}
      /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function (exports) {
      /******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/ 		}
      /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
      /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function (value, mode) {
      /******/ 		if (mode & 1) value = __webpack_require__(value);
      /******/ 		if (mode & 8) return value;
      /******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
      /******/ 		var ns = Object.create(null);
      /******/ 		__webpack_require__.r(ns);
      /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
      /******/ 		if (mode & 2 && typeof value !== 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
      /******/ 		return ns;
      /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function (module) {
      /******/ 		var getter = module && module.__esModule
      /******/ 			? function getDefault () { return module.default; }
      /******/ 			: function getModuleExports () { return module; };
      /******/ 		__webpack_require__.d(getter, 'a', getter);
      /******/ 		return getter;
      /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = '';
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = './lib/index.js');
    /******/ })
  /************************************************************************/
  /******/ ({

    /***/ './lib/hooks.js':
    /*! **********************!*\
  !*** ./lib/hooks.js ***!
  \**********************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      function ownKeys (object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty (obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      function asyncGeneratorStep (gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

      function _asyncToGenerator (fn) { return function () { var self = this; var args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next (value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value); } function _throw (err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err); } _next(undefined); }); }; }

      /** *** CACHE README
 * Cache is shared within the instance as a global state.  For multi-instance, multi-container caching, use feathers-redis-cache.
 * Configuration is global by default but can be made on a per-service basis.
 *
 *
 *
*/
      // cacheBefore({
      //     scope: 'myctxname',
      //     max: 500,
      //     maxAge: 1000 * 60 * 5, // 5 minutes, in milliseconds
      //     key: (ctx)=>{return ctx.path;} // defers to path + query but can be overridden
      //   });
      // test
      var LRU = __webpack_require__(/*! lru-cache */ './node_modules/lru-cache/index.js'); // const qs = require('querystring');

      var qs = __webpack_require__(/*! qs */ './node_modules/qs/lib/index.js');

      var setup = __webpack_require__(/*! ./setup */ './lib/setup.js');

      var _require = __webpack_require__(/*! ./utils */ './lib/utils.js');
      var purge = _require.purge;
      var purgeScope = _require.purgeScope;
      var getKey = _require.getKey;
      var hashCode = _require.hashCode; // eslint-disable-next-line no-unused-vars

      var before = function before () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return /* #__PURE__ */(function () {
          var _ref = _asyncToGenerator(/* #__PURE__ */regeneratorRuntime.mark(function _callee (ctx) {
            var cache, key, stored, _cache, _key;

            return regeneratorRuntime.wrap(function _callee$ (_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    options = _objectSpread({
                      scope: 'Global'
                    }, options);

                    if (!(ctx.params.$skipCacheHook == true)) {
                      _context.next = 3;
                      break;
                    }

                    return _context.abrupt('return', ctx);

                  case 3:
                    // If its a get, do the lookup and return unnested value
                    // possible values:
                    // FIND
                    //    /books
                    //    /books?x=y
                    //    /books/?x=y
                    // GET
                    //    /books/1
                    //    /books/1?x=y
                    if (ctx.method === 'get' || ctx.method === 'find') {
                      // console.log('scope', options.scope)
                      cache = ctx.app.get('cache_'.concat(options.scope)); // console.log('cache', cache)

                      key = getKey(ctx); // console.log('key', key)

                      stored = JSON.parse(cache.get(key)); // console.log('stored', stored)

                      if (stored) {
                        ctx.result = stored;
                      }

                      if (ctx.method === 'find' && stored) {
                        ctx.result = _objectSpread(_objectSpread({}, stored), {}, {
                          fromCache: true
                        });
                      }
                    } // If its a update, patch... reset key
                    // PATCH / UPDATE / DELETE
                    //    /books/1
                    // For a PATCH/UPDATE, we should invalidate any matching id based call (which means a loop)

                    if (ctx.method === 'patch' || ctx.method === 'update' || ctx.method === 'remove') {
                      _cache = ctx.app.get('cache_'.concat(options.scope));
                      _key = getKey(ctx);

                      _cache.del(_key);
                    }

                    return _context.abrupt('return', ctx);

                  case 6:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      };

      var after = function after () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return /* #__PURE__ */(function () {
          var _ref2 = _asyncToGenerator(/* #__PURE__ */regeneratorRuntime.mark(function _callee2 (ctx) {
            var cache, key;
            return regeneratorRuntime.wrap(function _callee2$ (_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    options = _objectSpread({
                      scope: 'Global'
                    }, options);

                    if (!(ctx.params.$skipCacheHook == true)) {
                      _context2.next = 3;
                      break;
                    }

                    return _context2.abrupt('return', ctx);

                  case 3:
                    cache = ctx.app.get('cache_'.concat(options.scope));
                    key = getKey(ctx);

                    if (ctx.result) {
                      cache.set(key, JSON.stringify(ctx.result));
                      ctx.params.cached = true;
                    }

                    return _context2.abrupt('return', ctx);

                  case 7:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      };

      module.exports = {
        before: before,
        after: after
      };
      /***/ },

    /***/ './lib/index.js':
    /*! **********************!*\
  !*** ./lib/index.js ***!
  \**********************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      var _require = __webpack_require__(/*! ./hooks */ './lib/hooks.js');
      var before = _require.before;
      var after = _require.after;

      var setup = __webpack_require__(/*! ./setup */ './lib/setup.js');

      module.exports = {
        cacheBefore: before,
        cacheAfter: after,
        cacheSetup: setup
      };
      /***/ },

    /***/ './lib/setup.js':
    /*! **********************!*\
  !*** ./lib/setup.js ***!
  \**********************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      function ownKeys (object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty (obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      var LRU = __webpack_require__(/*! lru-cache */ './node_modules/lru-cache/index.js');

      var setup = function setup () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return function (app) {
          options = _objectSpread(_objectSpread({
            max: 500,
            maxAge: 1000 * 60 * 5,
            key: typeof options.key === 'function' ? options.key : getKey
          }, options), app.get('cache'));
          var scope = typeof options.scope === 'string' ? 'cache_'.concat(options.scope) : 'cache_Global';
          var cache = app.get(scope);

          if (!app.get('cache_Global')) {
            cache = new LRU(options);
            app.set(scope, _objectSpread(_objectSpread({}, cache), {}, {
              getKey: getKey
            }));
          }

          return cache;
        };
      };

      module.exports = setup;
      /***/ },

    /***/ './lib/utils.js':
    /*! **********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      var qs = __webpack_require__(/*! querystring */ './node_modules/querystring-es3/index.js'); // Collisions are possible with this code but not likely

      function hashCode (s) {
        var h;

        for (var i = 0; i < s.length; i++) {
          h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }

        return String(h);
      }

      function getKey (hook) {
        hook.params = hook.params || {};
        var q = hook.params.query || {};
        var p = hook.params.paginate === false ? 'disabled' : 'enabled';
        var path = 'pagination-hook:'.concat(p, '::').concat(hook.path);
        var idHash = '';

        if (hook.id) {
          path += '/'.concat(hook.id);
          idHash = hashCode('/'.concat(hook.id));
        }

        if (Object.keys(q).length > 0) {
          path += '?'.concat(qs.stringify(JSON.parse(JSON.stringify(q)), {
            encode: false
          }));
        } // {prefix}{group}{key}

        return ''.concat(hashCode(hook.path), '_').concat(idHash, '_').concat(hashCode(path)); // prefix{books}{/1234}{pagination-hook:enabled::books/id?q=xxx&y=zzz}
      } // This iterates through ALL of the keys and deletes any with a matching path AND id `{path}{id}`

      var purgeId = function purgeId () {
        var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Global';
        return function (ctx) {
          var cache = ctx.app.get('cache_'.concat(scope));

          if (ctx.id) {
            pathHash = hashCode(''.concat(ctx.path));
            idHash = hashCode('/'.concat(ctx.id));
            cache.forEach(function (value, key, cache) {
              if (key.indexOf(''.concat(pathHash, '_').concat(idHash, '_')) === 0) {
                cache.del(key);
              }
            });
          }
        };
      }; // This iterates through ALL of the keys and deletes any with a matching path and any ID `{path}`

      var purgePath = function purgePath () {
        var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Global';
        return function (ctx) {
          var cache = ctx.app.get('cache_'.concat(scope));

          if (ctx.path) {
            pathHash = hashCode(ctx.path);
            cache.forEach(function (value, key, cache) {
              if (key.indexOf(''.concat(pathHash, '_')) === 0) {
                cache.del(key);
              }
            });
          }
        };
      }; // Cleans out the entire cache by scope

      var purge = function purge () {
        var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Global';
        return function (ctx) {
          var cache = ctx.app.get('cache_'.concat(scope));
          cache.reset();
        };
      };

      module.exports = {
        purge: purge,
        purgeId: purgeId,
        purgePath: purgePath,
        getKey: getKey,
        hashCode: hashCode
      };
      /***/ },

    /***/ './node_modules/lru-cache/index.js':
    /*! *****************************************!*\
  !*** ./node_modules/lru-cache/index.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      // A linked list to keep track of recently-used-ness
      const Yallist = __webpack_require__(/*! yallist */ './node_modules/yallist/yallist.js');

      const MAX = Symbol('max');
      const LENGTH = Symbol('length');
      const LENGTH_CALCULATOR = Symbol('lengthCalculator');
      const ALLOW_STALE = Symbol('allowStale');
      const MAX_AGE = Symbol('maxAge');
      const DISPOSE = Symbol('dispose');
      const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
      const LRU_LIST = Symbol('lruList');
      const CACHE = Symbol('cache');
      const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

      const naiveLength = () => 1;

      // lruList is a yallist where the head is the youngest
      // item, and the tail is the oldest.  the list contains the Hit
      // objects as the entries.
      // Each Hit object has a reference to its Yallist.Node.  This
      // never changes.
      //
      // cache is a Map (or PseudoMap) that matches the keys to
      // the Yallist.Node object.
      class LRUCache {
        constructor (options) {
          if (typeof options === 'number') { options = { max: options }; }

          if (!options) { options = {}; }

          if (options.max && (typeof options.max !== 'number' || options.max < 0)) { throw new TypeError('max must be a non-negative number'); }
          // Kind of weird to have a default max of Infinity, but oh well.
          const max = this[MAX] = options.max || Infinity;

          const lc = options.length || naiveLength;
          this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
          this[ALLOW_STALE] = options.stale || false;
          if (options.maxAge && typeof options.maxAge !== 'number') { throw new TypeError('maxAge must be a number'); }
          this[MAX_AGE] = options.maxAge || 0;
          this[DISPOSE] = options.dispose;
          this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
          this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
          this.reset();
        }

        // resize the cache when the max changes.
        set max (mL) {
          if (typeof mL !== 'number' || mL < 0) { throw new TypeError('max must be a non-negative number'); }

          this[MAX] = mL || Infinity;
          trim(this);
        }

        get max () {
          return this[MAX];
        }

        set allowStale (allowStale) {
          this[ALLOW_STALE] = !!allowStale;
        }

        get allowStale () {
          return this[ALLOW_STALE];
        }

        set maxAge (mA) {
          if (typeof mA !== 'number') { throw new TypeError('maxAge must be a non-negative number'); }

          this[MAX_AGE] = mA;
          trim(this);
        }

        get maxAge () {
          return this[MAX_AGE];
        }

        // resize the cache when the lengthCalculator changes.
        set lengthCalculator (lC) {
          if (typeof lC !== 'function') { lC = naiveLength; }

          if (lC !== this[LENGTH_CALCULATOR]) {
            this[LENGTH_CALCULATOR] = lC;
            this[LENGTH] = 0;
            this[LRU_LIST].forEach(hit => {
              hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
              this[LENGTH] += hit.length;
            });
          }
          trim(this);
        }

        get lengthCalculator () { return this[LENGTH_CALCULATOR]; }

        get length () { return this[LENGTH]; }
        get itemCount () { return this[LRU_LIST].length; }

        rforEach (fn, thisp) {
          thisp = thisp || this;
          for (let walker = this[LRU_LIST].tail; walker !== null;) {
            const prev = walker.prev;
            forEachStep(this, fn, walker, thisp);
            walker = prev;
          }
        }

        forEach (fn, thisp) {
          thisp = thisp || this;
          for (let walker = this[LRU_LIST].head; walker !== null;) {
            const next = walker.next;
            forEachStep(this, fn, walker, thisp);
            walker = next;
          }
        }

        keys () {
          return this[LRU_LIST].toArray().map(k => k.key);
        }

        values () {
          return this[LRU_LIST].toArray().map(k => k.value);
        }

        reset () {
          if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
            this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
          }

          this[CACHE] = new Map(); // hash of items by key
          this[LRU_LIST] = new Yallist(); // list of items in order of use recency
          this[LENGTH] = 0; // length of items in the list
        }

        dump () {
          return this[LRU_LIST].map(hit =>
            isStale(this, hit) ? false : {
              k: hit.key,
              v: hit.value,
              e: hit.now + (hit.maxAge || 0)
            }).toArray().filter(h => h);
        }

        dumpLru () {
          return this[LRU_LIST];
        }

        set (key, value, maxAge) {
          maxAge = maxAge || this[MAX_AGE];

          if (maxAge && typeof maxAge !== 'number') { throw new TypeError('maxAge must be a number'); }

          const now = maxAge ? Date.now() : 0;
          const len = this[LENGTH_CALCULATOR](value, key);

          if (this[CACHE].has(key)) {
            if (len > this[MAX]) {
              del(this, this[CACHE].get(key));
              return false;
            }

            const node = this[CACHE].get(key);
            const item = node.value;

            // dispose of the old one before overwriting
            // split out into 2 ifs for better coverage tracking
            if (this[DISPOSE]) {
              if (!this[NO_DISPOSE_ON_SET]) { this[DISPOSE](key, item.value); }
            }

            item.now = now;
            item.maxAge = maxAge;
            item.value = value;
            this[LENGTH] += len - item.length;
            item.length = len;
            this.get(key);
            trim(this);
            return true;
          }

          const hit = new Entry(key, value, len, now, maxAge);

          // oversized objects fall out of cache automatically.
          if (hit.length > this[MAX]) {
            if (this[DISPOSE]) { this[DISPOSE](key, value); }

            return false;
          }

          this[LENGTH] += hit.length;
          this[LRU_LIST].unshift(hit);
          this[CACHE].set(key, this[LRU_LIST].head);
          trim(this);
          return true;
        }

        has (key) {
          if (!this[CACHE].has(key)) return false;
          const hit = this[CACHE].get(key).value;
          return !isStale(this, hit);
        }

        get (key) {
          return get(this, key, true);
        }

        peek (key) {
          return get(this, key, false);
        }

        pop () {
          const node = this[LRU_LIST].tail;
          if (!node) { return null; }

          del(this, node);
          return node.value;
        }

        del (key) {
          del(this, this[CACHE].get(key));
        }

        load (arr) {
          // reset the cache
          this.reset();

          const now = Date.now();
          // A previous serialized cache has the most recent items first
          for (let l = arr.length - 1; l >= 0; l--) {
            const hit = arr[l];
            const expiresAt = hit.e || 0;
            if (expiresAt === 0)
            // the item was created without expiration in a non aged cache
            { this.set(hit.k, hit.v); } else {
              const maxAge = expiresAt - now;
              // dont add already expired items
              if (maxAge > 0) {
                this.set(hit.k, hit.v, maxAge);
              }
            }
          }
        }

        prune () {
          this[CACHE].forEach((value, key) => get(this, key, false));
        }
      }

      const get = (self, key, doUse) => {
        const node = self[CACHE].get(key);
        if (node) {
          const hit = node.value;
          if (isStale(self, hit)) {
            del(self, node);
            if (!self[ALLOW_STALE]) { return undefined; }
          } else {
            if (doUse) {
              if (self[UPDATE_AGE_ON_GET]) { node.value.now = Date.now(); }
              self[LRU_LIST].unshiftNode(node);
            }
          }
          return hit.value;
        }
      };

      const isStale = (self, hit) => {
        if (!hit || (!hit.maxAge && !self[MAX_AGE])) { return false; }

        const diff = Date.now() - hit.now;
        return hit.maxAge ? diff > hit.maxAge
          : self[MAX_AGE] && (diff > self[MAX_AGE]);
      };

      const trim = self => {
        if (self[LENGTH] > self[MAX]) {
          for (let walker = self[LRU_LIST].tail;
            self[LENGTH] > self[MAX] && walker !== null;) {
            // We know that we're about to delete this one, and also
            // what the next least recently used key will be, so just
            // go ahead and set it now.
            const prev = walker.prev;
            del(self, walker);
            walker = prev;
          }
        }
      };

      const del = (self, node) => {
        if (node) {
          const hit = node.value;
          if (self[DISPOSE]) { self[DISPOSE](hit.key, hit.value); }

          self[LENGTH] -= hit.length;
          self[CACHE].delete(hit.key);
          self[LRU_LIST].removeNode(node);
        }
      };

      class Entry {
        constructor (key, value, length, now, maxAge) {
          this.key = key;
          this.value = value;
          this.length = length;
          this.now = now;
          this.maxAge = maxAge || 0;
        }
      }

      const forEachStep = (self, fn, node, thisp) => {
        let hit = node.value;
        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE]) { hit = undefined; }
        }
        if (hit) { fn.call(thisp, hit.value, hit.key, self); }
      };

      module.exports = LRUCache;
      /***/ },

    /***/ './node_modules/qs/lib/formats.js':
    /*! ****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      var replace = String.prototype.replace;
      var percentTwenties = /%20/g;

      module.exports = {
        default: 'RFC3986',
        formatters: {
          RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
          },
          RFC3986: function (value) {
            return value;
          }
        },
        RFC1738: 'RFC1738',
        RFC3986: 'RFC3986'
      };
      /***/ },

    /***/ './node_modules/qs/lib/index.js':
    /*! **************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      var stringify = __webpack_require__(/*! ./stringify */ './node_modules/qs/lib/stringify.js');
      var parse = __webpack_require__(/*! ./parse */ './node_modules/qs/lib/parse.js');
      var formats = __webpack_require__(/*! ./formats */ './node_modules/qs/lib/formats.js');

      module.exports = {
        formats: formats,
        parse: parse,
        stringify: stringify
      };
      /***/ },

    /***/ './node_modules/qs/lib/parse.js':
    /*! **************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      var utils = __webpack_require__(/*! ./utils */ './node_modules/qs/lib/utils.js');

      var has = Object.prototype.hasOwnProperty;

      var defaults = {
        allowDots: false,
        allowPrototypes: false,
        arrayLimit: 20,
        charset: 'utf-8',
        charsetSentinel: false,
        comma: false,
        decoder: utils.decode,
        delimiter: '&',
        depth: 5,
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1000,
        parseArrays: true,
        plainObjects: false,
        strictNullHandling: false
      };

      var interpretNumericEntities = function (str) {
        return str.replace(/&#(\d+);/g, function ($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
        });
      };

      // This is what browsers will submit when the ✓ character occurs in an
      // application/x-www-form-urlencoded body and the encoding of the page containing
      // the form is iso-8859-1, or when the submitted form has an accept-charset
      // attribute of iso-8859-1. Presumably also with other charsets that do not contain
      // the ✓ character, such as us-ascii.
      var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

      // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
      var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

      var parseValues = function parseQueryStringValues (str, options) {
        var obj = {};
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
        var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, limit);
        var skipIndex = -1; // Keep track of where the utf8 sentinel was found
        var i;

        var charset = options.charset;
        if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
              if (parts[i] === charsetSentinel) {
                charset = 'utf-8';
              } else if (parts[i] === isoSentinel) {
                charset = 'iso-8859-1';
              }
              skipIndex = i;
              i = parts.length; // The eslint settings do not allow break;
            }
          }
        }

        for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
            continue;
          }
          var part = parts[i];

          var bracketEqualsPos = part.indexOf(']=');
          var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

          var key, val;
          if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
          } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
          }

          if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
          }

          if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
          }

          if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
          } else {
            obj[key] = val;
          }
        }

        return obj;
      };

      var parseObject = function (chain, val, options) {
        var leaf = val;

        for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];

          if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
          } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
              obj = { 0: leaf };
            } else if (
              !isNaN(index) &&
                root !== cleanRoot &&
                String(index) === cleanRoot &&
                index >= 0 &&
                (options.parseArrays && index <= options.arrayLimit)
            ) {
              obj = [];
              obj[index] = leaf;
            } else {
              obj[cleanRoot] = leaf;
            }
          }

          leaf = obj;
        }

        return leaf;
      };

      var parseKeys = function parseQueryStringKeys (givenKey, val, options) {
        if (!givenKey) {
          return;
        }

        // Transform dot notation to bracket notation
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

        // The regex chunks

        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;

        // Get the parent

        var segment = brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;

        // Stash the parent if it exists

        var keys = [];
        if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
          if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }

          keys.push(parent);
        }

        // Loop through children appending to the array until we hit depth

        var i = 0;
        while ((segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys.push(segment[1]);
        }

        // If there's a remainder, just add whatever is left

        if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
        }

        return parseObject(keys, val, options);
      };

      var normalizeParseOptions = function normalizeParseOptions (opts) {
        if (!opts) {
          return defaults;
        }

        if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
        }

        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
        }
        var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

        return {
          allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
          arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
          comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
          decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
          delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
          depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
        };
      };

      module.exports = function (str, opts) {
        var options = normalizeParseOptions(opts);

        if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
        }

        var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
        var obj = options.plainObjects ? Object.create(null) : {};

        // Iterate over the keys and setup the new object

        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options);
          obj = utils.merge(obj, newObj, options);
        }

        return utils.compact(obj);
      };
      /***/ },

    /***/ './node_modules/qs/lib/stringify.js':
    /*! ******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      var utils = __webpack_require__(/*! ./utils */ './node_modules/qs/lib/utils.js');
      var formats = __webpack_require__(/*! ./formats */ './node_modules/qs/lib/formats.js');
      var has = Object.prototype.hasOwnProperty;

      var arrayPrefixGenerators = {
        brackets: function brackets (prefix) { // eslint-disable-line func-name-matching
          return prefix + '[]';
        },
        comma: 'comma',
        indices: function indices (prefix, key) { // eslint-disable-line func-name-matching
          return prefix + '[' + key + ']';
        },
        repeat: function repeat (prefix) { // eslint-disable-line func-name-matching
          return prefix;
        }
      };

      var isArray = Array.isArray;
      var push = Array.prototype.push;
      var pushToArray = function (arr, valueOrArray) {
        push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
      };

      var toISO = Date.prototype.toISOString;

      var defaults = {
        addQueryPrefix: false,
        allowDots: false,
        charset: 'utf-8',
        charsetSentinel: false,
        delimiter: '&',
        encode: true,
        encoder: utils.encode,
        encodeValuesOnly: false,
        formatter: formats.formatters[formats.default],
        // deprecated
        indices: false,
        serializeDate: function serializeDate (date) { // eslint-disable-line func-name-matching
          return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
      };

      var stringify = function stringify ( // eslint-disable-line func-name-matching
        object,
        prefix,
        generateArrayPrefix,
        strictNullHandling,
        skipNulls,
        encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        formatter,
        encodeValuesOnly,
        charset
      ) {
        var obj = object;
        if (typeof filter === 'function') {
          obj = filter(prefix, obj);
        } else if (obj instanceof Date) {
          obj = serializeDate(obj);
        } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
          obj = obj.join(',');
        }

        if (obj === null) {
          if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
          }

          obj = '';
        }

        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
          if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
        }

        var values = [];

        if (typeof obj === 'undefined') {
          return values;
        }

        var objKeys;
        if (isArray(filter)) {
          objKeys = filter;
        } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
        }

        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (skipNulls && obj[key] === null) {
            continue;
          }

          if (isArray(obj)) {
            pushToArray(values, stringify(
              obj[key],
              typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              formatter,
              encodeValuesOnly,
              charset
            ));
          } else {
            pushToArray(values, stringify(
              obj[key],
              prefix + (allowDots ? '.' + key : '[' + key + ']'),
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              formatter,
              encodeValuesOnly,
              charset
            ));
          }
        }

        return values;
      };

      var normalizeStringifyOptions = function normalizeStringifyOptions (opts) {
        if (!opts) {
          return defaults;
        }

        if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
        }

        var charset = opts.charset || defaults.charset;
        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
        }

        var format = formats.default;
        if (typeof opts.format !== 'undefined') {
          if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
          }
          format = opts.format;
        }
        var formatter = formats.formatters[format];

        var filter = defaults.filter;
        if (typeof opts.filter === 'function' || isArray(opts.filter)) {
          filter = opts.filter;
        }

        return {
          addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
          delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
          encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter: filter,
          formatter: formatter,
          serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === 'function' ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
        };
      };

      module.exports = function (object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);

        var objKeys;
        var filter;

        if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
        } else if (isArray(options.filter)) {
          filter = options.filter;
          objKeys = filter;
        }

        var keys = [];

        if (typeof obj !== 'object' || obj === null) {
          return '';
        }

        var arrayFormat;
        if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
        } else if (opts && 'indices' in opts) {
          arrayFormat = opts.indices ? 'indices' : 'repeat';
        } else {
          arrayFormat = 'indices';
        }

        var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

        if (!objKeys) {
          objKeys = Object.keys(obj);
        }

        if (options.sort) {
          objKeys.sort(options.sort);
        }

        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (options.skipNulls && obj[key] === null) {
            continue;
          }
          pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
          ));
        }

        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? '?' : '';

        if (options.charsetSentinel) {
          if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
          } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
          }
        }

        return joined.length > 0 ? prefix + joined : '';
      };
      /***/ },

    /***/ './node_modules/qs/lib/utils.js':
    /*! **************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      var has = Object.prototype.hasOwnProperty;
      var isArray = Array.isArray;

      var hexTable = (function () {
        var array = [];
        for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
        }

        return array;
      }());

      var compactQueue = function compactQueue (queue) {
        while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];

          if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
              if (typeof obj[j] !== 'undefined') {
                compacted.push(obj[j]);
              }
            }

            item.obj[item.prop] = compacted;
          }
        }
      };

      var arrayToObject = function arrayToObject (source, options) {
        var obj = options && options.plainObjects ? Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
          }
        }

        return obj;
      };

      var merge = function merge (target, source, options) {
        if (!source) {
          return target;
        }

        if (typeof source !== 'object') {
          if (isArray(target)) {
            target.push(source);
          } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
              target[source] = true;
            }
          } else {
            return [target, source];
          }

          return target;
        }

        if (!target || typeof target !== 'object') {
          return [target].concat(source);
        }

        var mergeTarget = target;
        if (isArray(target) && !isArray(source)) {
          mergeTarget = arrayToObject(target, options);
        }

        if (isArray(target) && isArray(source)) {
          source.forEach(function (item, i) {
            if (has.call(target, i)) {
              var targetItem = target[i];
              if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                target[i] = merge(targetItem, item, options);
              } else {
                target.push(item);
              }
            } else {
              target[i] = item;
            }
          });
          return target;
        }

        return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];

          if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
          } else {
            acc[key] = value;
          }
          return acc;
        }, mergeTarget);
      };

      var assign = function assignSingleSource (target, source) {
        return Object.keys(source).reduce(function (acc, key) {
          acc[key] = source[key];
          return acc;
        }, target);
      };

      var decode = function (str, decoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, ' ');
        if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        // utf-8
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      };

      var encode = function encode (str, defaultEncoder, charset) {
        // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
        // It has been adapted here for stricter adherence to RFC 3986
        if (str.length === 0) {
          return str;
        }

        var string = typeof str === 'string' ? str : String(str);

        if (charset === 'iso-8859-1') {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
          });
        }

        var out = '';
        for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);

          if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
          ) {
            out += string.charAt(i);
            continue;
          }

          if (c < 0x80) {
            out = out + hexTable[c];
            continue;
          }

          if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
          }

          if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
          }

          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          out += hexTable[0xF0 | (c >> 18)] +
            hexTable[0x80 | ((c >> 12) & 0x3F)] +
            hexTable[0x80 | ((c >> 6) & 0x3F)] +
            hexTable[0x80 | (c & 0x3F)];
        }

        return out;
      };

      var compact = function compact (value) {
        var queue = [{ obj: { o: value }, prop: 'o' }];
        var refs = [];

        for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];

          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
              queue.push({ obj: obj, prop: key });
              refs.push(val);
            }
          }
        }

        compactQueue(queue);

        return value;
      };

      var isRegExp = function isRegExp (obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
      };

      var isBuffer = function isBuffer (obj) {
        if (!obj || typeof obj !== 'object') {
          return false;
        }

        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
      };

      var combine = function combine (a, b) {
        return [].concat(a, b);
      };

      module.exports = {
        arrayToObject: arrayToObject,
        assign: assign,
        combine: combine,
        compact: compact,
        decode: decode,
        encode: encode,
        isBuffer: isBuffer,
        isRegExp: isRegExp,
        merge: merge
      };
      /***/ },

    /***/ './node_modules/querystring-es3/decode.js':
    /*! ************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      // If obj.hasOwnProperty has been overridden, then calling
      // obj.hasOwnProperty(prop) will break.
      // See: https://github.com/joyent/node/issues/1707
      function hasOwnProperty (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      module.exports = function (qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};

        if (typeof qs !== 'string' || qs.length === 0) {
          return obj;
        }

        var regexp = /\+/g;
        qs = qs.split(sep);

        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
          maxKeys = options.maxKeys;
        }

        var len = qs.length;
        // maxKeys <= 0 means that we should not limit keys count
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }

        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, '%20');
          var idx = x.indexOf(eq);
          var kstr; var vstr; var k; var v;

          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = '';
          }

          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);

          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }

        return obj;
      };

      var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };
      /***/ },

    /***/ './node_modules/querystring-es3/encode.js':
    /*! ************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      var stringifyPrimitive = function (v) {
        switch (typeof v) {
          case 'string':
            return v;

          case 'boolean':
            return v ? 'true' : 'false';

          case 'number':
            return isFinite(v) ? v : '';

          default:
            return '';
        }
      };

      module.exports = function (obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
          obj = undefined;
        }

        if (typeof obj === 'object') {
          return map(objectKeys(obj), function (k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (isArray(obj[k])) {
              return map(obj[k], function (v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
        }

        if (!name) return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
      };

      var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };

      function map (xs, f) {
        if (xs.map) return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          res.push(f(xs[i], i));
        }
        return res;
      }

      var objectKeys = Object.keys || function (obj) {
        var res = [];
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
        }
        return res;
      };
      /***/ },

    /***/ './node_modules/querystring-es3/index.js':
    /*! ***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      exports.decode = exports.parse = __webpack_require__(/*! ./decode */ './node_modules/querystring-es3/decode.js');
      exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ './node_modules/querystring-es3/encode.js');
      /***/ },

    /***/ './node_modules/yallist/iterator.js':
    /*! ******************************************!*\
  !*** ./node_modules/yallist/iterator.js ***!
  \******************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      module.exports = function (Yallist) {
        Yallist.prototype[Symbol.iterator] = function * () {
          for (let walker = this.head; walker; walker = walker.next) {
            yield walker.value;
          }
        };
      };
      /***/ },

    /***/ './node_modules/yallist/yallist.js':
    /*! *****************************************!*\
  !*** ./node_modules/yallist/yallist.js ***!
  \*****************************************/
    /*! no static exports found */
    /***/ function (module, exports, __webpack_require__) {
      'use strict';

      module.exports = Yallist;

      Yallist.Node = Node;
      Yallist.create = Yallist;

      function Yallist (list) {
        var self = this;
        if (!(self instanceof Yallist)) {
          self = new Yallist();
        }

        self.tail = null;
        self.head = null;
        self.length = 0;

        if (list && typeof list.forEach === 'function') {
          list.forEach(function (item) {
            self.push(item);
          });
        } else if (arguments.length > 0) {
          for (var i = 0, l = arguments.length; i < l; i++) {
            self.push(arguments[i]);
          }
        }

        return self;
      }

      Yallist.prototype.removeNode = function (node) {
        if (node.list !== this) {
          throw new Error('removing node which does not belong to this list');
        }

        var next = node.next;
        var prev = node.prev;

        if (next) {
          next.prev = prev;
        }

        if (prev) {
          prev.next = next;
        }

        if (node === this.head) {
          this.head = next;
        }
        if (node === this.tail) {
          this.tail = prev;
        }

        node.list.length--;
        node.next = null;
        node.prev = null;
        node.list = null;

        return next;
      };

      Yallist.prototype.unshiftNode = function (node) {
        if (node === this.head) {
          return;
        }

        if (node.list) {
          node.list.removeNode(node);
        }

        var head = this.head;
        node.list = this;
        node.next = head;
        if (head) {
          head.prev = node;
        }

        this.head = node;
        if (!this.tail) {
          this.tail = node;
        }
        this.length++;
      };

      Yallist.prototype.pushNode = function (node) {
        if (node === this.tail) {
          return;
        }

        if (node.list) {
          node.list.removeNode(node);
        }

        var tail = this.tail;
        node.list = this;
        node.prev = tail;
        if (tail) {
          tail.next = node;
        }

        this.tail = node;
        if (!this.head) {
          this.head = node;
        }
        this.length++;
      };

      Yallist.prototype.push = function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
          push(this, arguments[i]);
        }
        return this.length;
      };

      Yallist.prototype.unshift = function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
          unshift(this, arguments[i]);
        }
        return this.length;
      };

      Yallist.prototype.pop = function () {
        if (!this.tail) {
          return undefined;
        }

        var res = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
          this.tail.next = null;
        } else {
          this.head = null;
        }
        this.length--;
        return res;
      };

      Yallist.prototype.shift = function () {
        if (!this.head) {
          return undefined;
        }

        var res = this.head.value;
        this.head = this.head.next;
        if (this.head) {
          this.head.prev = null;
        } else {
          this.tail = null;
        }
        this.length--;
        return res;
      };

      Yallist.prototype.forEach = function (fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.head, i = 0; walker !== null; i++) {
          fn.call(thisp, walker.value, i, this);
          walker = walker.next;
        }
      };

      Yallist.prototype.forEachReverse = function (fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
          fn.call(thisp, walker.value, i, this);
          walker = walker.prev;
        }
      };

      Yallist.prototype.get = function (n) {
        for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
          // abort out of the list early if we hit a cycle
          walker = walker.next;
        }
        if (i === n && walker !== null) {
          return walker.value;
        }
      };

      Yallist.prototype.getReverse = function (n) {
        for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
          // abort out of the list early if we hit a cycle
          walker = walker.prev;
        }
        if (i === n && walker !== null) {
          return walker.value;
        }
      };

      Yallist.prototype.map = function (fn, thisp) {
        thisp = thisp || this;
        var res = new Yallist();
        for (var walker = this.head; walker !== null;) {
          res.push(fn.call(thisp, walker.value, this));
          walker = walker.next;
        }
        return res;
      };

      Yallist.prototype.mapReverse = function (fn, thisp) {
        thisp = thisp || this;
        var res = new Yallist();
        for (var walker = this.tail; walker !== null;) {
          res.push(fn.call(thisp, walker.value, this));
          walker = walker.prev;
        }
        return res;
      };

      Yallist.prototype.reduce = function (fn, initial) {
        var acc;
        var walker = this.head;
        if (arguments.length > 1) {
          acc = initial;
        } else if (this.head) {
          walker = this.head.next;
          acc = this.head.value;
        } else {
          throw new TypeError('Reduce of empty list with no initial value');
        }

        for (var i = 0; walker !== null; i++) {
          acc = fn(acc, walker.value, i);
          walker = walker.next;
        }

        return acc;
      };

      Yallist.prototype.reduceReverse = function (fn, initial) {
        var acc;
        var walker = this.tail;
        if (arguments.length > 1) {
          acc = initial;
        } else if (this.tail) {
          walker = this.tail.prev;
          acc = this.tail.value;
        } else {
          throw new TypeError('Reduce of empty list with no initial value');
        }

        for (var i = this.length - 1; walker !== null; i--) {
          acc = fn(acc, walker.value, i);
          walker = walker.prev;
        }

        return acc;
      };

      Yallist.prototype.toArray = function () {
        var arr = new Array(this.length);
        for (var i = 0, walker = this.head; walker !== null; i++) {
          arr[i] = walker.value;
          walker = walker.next;
        }
        return arr;
      };

      Yallist.prototype.toArrayReverse = function () {
        var arr = new Array(this.length);
        for (var i = 0, walker = this.tail; walker !== null; i++) {
          arr[i] = walker.value;
          walker = walker.prev;
        }
        return arr;
      };

      Yallist.prototype.slice = function (from, to) {
        to = to || this.length;
        if (to < 0) {
          to += this.length;
        }
        from = from || 0;
        if (from < 0) {
          from += this.length;
        }
        var ret = new Yallist();
        if (to < from || to < 0) {
          return ret;
        }
        if (from < 0) {
          from = 0;
        }
        if (to > this.length) {
          to = this.length;
        }
        for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
          walker = walker.next;
        }
        for (; walker !== null && i < to; i++, walker = walker.next) {
          ret.push(walker.value);
        }
        return ret;
      };

      Yallist.prototype.sliceReverse = function (from, to) {
        to = to || this.length;
        if (to < 0) {
          to += this.length;
        }
        from = from || 0;
        if (from < 0) {
          from += this.length;
        }
        var ret = new Yallist();
        if (to < from || to < 0) {
          return ret;
        }
        if (from < 0) {
          from = 0;
        }
        if (to > this.length) {
          to = this.length;
        }
        for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
          walker = walker.prev;
        }
        for (; walker !== null && i > from; i--, walker = walker.prev) {
          ret.push(walker.value);
        }
        return ret;
      };

      Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
        if (start > this.length) {
          start = this.length - 1;
        }
        if (start < 0) {
          start = this.length + start;
        }

        for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
          walker = walker.next;
        }

        var ret = [];
        for (var i = 0; walker && i < deleteCount; i++) {
          ret.push(walker.value);
          walker = this.removeNode(walker);
        }
        if (walker === null) {
          walker = this.tail;
        }

        if (walker !== this.head && walker !== this.tail) {
          walker = walker.prev;
        }

        for (var i = 0; i < nodes.length; i++) {
          walker = insert(this, walker, nodes[i]);
        }
        return ret;
      };

      Yallist.prototype.reverse = function () {
        var head = this.head;
        var tail = this.tail;
        for (var walker = head; walker !== null; walker = walker.prev) {
          var p = walker.prev;
          walker.prev = walker.next;
          walker.next = p;
        }
        this.head = tail;
        this.tail = head;
        return this;
      };

      function insert (self, node, value) {
        var inserted = node === self.head
          ? new Node(value, null, node, self)
          : new Node(value, node, node.next, self);

        if (inserted.next === null) {
          self.tail = inserted;
        }
        if (inserted.prev === null) {
          self.head = inserted;
        }

        self.length++;

        return inserted;
      }

      function push (self, item) {
        self.tail = new Node(item, self.tail, null, self);
        if (!self.head) {
          self.head = self.tail;
        }
        self.length++;
      }

      function unshift (self, item) {
        self.head = new Node(item, null, self.head, self);
        if (!self.tail) {
          self.tail = self.head;
        }
        self.length++;
      }

      function Node (value, prev, next, list) {
        if (!(this instanceof Node)) {
          return new Node(value, prev, next, list);
        }

        this.list = list;
        this.value = value;

        if (prev) {
          prev.next = this;
          this.prev = prev;
        } else {
          this.prev = null;
        }

        if (next) {
          next.prev = this;
          this.next = next;
        } else {
          this.next = null;
        }
      }

      try {
        // add if support for Symbol.iterator is present
        __webpack_require__(/*! ./iterator.js */ './node_modules/yallist/iterator.js')(Yallist);
      } catch (er) {}
      /***/ }

    /******/ });
});
// # sourceMappingURL=feathers-memory.js.map
