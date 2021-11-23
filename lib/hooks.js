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

const LRU = require('lru-cache');
// const qs = require('querystring');
const qs = require('qs');
const setup = require('./setup');
const { purge, purgeScope, getKey, hashCode } = require('./utils');

// eslint-disable-next-line no-unused-vars
const before = (options = {}) => async (ctx) => {
  options = {
    scope: 'Global',
    ...options
  };

  if (ctx.params.$skipCacheHook == true) {
    return ctx;
  }

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
    const { cache, customFn } = ctx.app.get(`cache_${options.scope}`)
    // console.log('cache', cache)
    const key = getKey(ctx, cache.customFn);
    // console.log('key', key)
    let raw = cache.get(key)
    // if undefined, return
    if(!raw){return ctx}

    const stored = JSON.parse(raw);
    // console.log('stored', stored)
    if (stored) {
      ctx.params.fromCache = true;
      ctx.result = stored;
    }

  }

  // If its a update, patch... reset key
  // PATCH / UPDATE / DELETE
  //    /books/1
  // For a PATCH/UPDATE, we should invalidate any matching id based call (which means a loop)
  if (ctx.method === 'patch' || ctx.method === 'update' || ctx.method === 'remove') {
    const { cache, customFn } = ctx.app.get(`cache_${options.scope}`)
    const key = getKey(ctx, customFn);
    cache.del(key);
  }
  return ctx;
};

const after = (options = {}) => async (ctx) => {
  options = {
    scope: 'Global',
    ...options
  };

  if (ctx.params.$skipCacheHook == true) {
    return ctx;
  }

  // if from cache, don't reset it
  // if(ctx.method === 'find'){
  //   console.log('check')
  // }
  // console.log('\n\n\nmethod',ctx.method, ctx.path)
  // console.log('params', ctx.params)
  // console.log('result',ctx.result)
  if (!ctx.params.fromCache){
    // if there is a result
    if (ctx.result) {
      const { cache, customFn } = ctx.app.get(`cache_${options.scope}`)
      const key = getKey(ctx, customFn);
      cache.set(key, JSON.stringify(ctx.result));
      ctx.params.cached = true;
    }
  }else if(ctx.method === 'find'){
    ctx.result.fromCache = true
  }

  return ctx;
};

module.exports = {
  before,
  after
};
