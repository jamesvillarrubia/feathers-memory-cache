/****** CACHE README
 * Cache is shared within the instance as a global state.  For multi-instance, multi-container caching, use feathers-redis-cache.
 * Configuration is global by default but can be made on a per-service basis.
*/

/****** CACHE EXAMPLE
cacheBefore({
  scope: 'myctxname', // this creates a new cache with this name, and the following parameters
  max: 500,
  maxAge: 1000 * 60 * 5, // 5 minutes, in milliseconds
  key: (ctx)=>{return ctx.path;} // this overrides the keying function, use with caution
  customHash: (ctx=>){ return '';} // this appends a custom unique hash to the end of the DEFAULT key function, for extra granularity
});
/******/ 

import { setup } from './setup'
import { purgeId, CustomHash, CustomKey } from './utils';
import { HookContext } from '@feathersjs/feathers';



export interface Options {
  scope?: string;
  customHash?: CustomHash;
  key?: CustomKey;
  [x:string]:any;
}

// eslint-disable-next-line no-unused-vars
export const before = (options?:Options) => async (ctx:HookContext) => {
  options={
    scope: 'Global',
    ...options
  };


  // allow for skipping
  if (ctx.params.$skipCacheHook == true) {
    return ctx;
  }    
  
  
  // if cache doesn't exist yet, create it
  // console.log('before', options)
  const { buildKey, cache, customHash } =  setup(options)(ctx.app)

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
    const newKey = buildKey(ctx, customHash);
    // console.log('before::new key', newKey)
    let raw = cache.get(newKey)
    
    // if undefined, return
    if(!raw){return ctx}

    const stored = JSON.parse(raw);
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
    purgeId(options.scope)(ctx)
  }
  return ctx;
};



export const after = (options?:Options) => async (ctx:HookContext) => {
  options = {
    scope: 'Global',
    ...options
  };

  // allow for skipping
  if (ctx.params.$skipCacheHook == true) {
    return ctx;
  }

  // if cache doesn't exist yet, create it
  const { buildKey, cache, customHash } =  setup(options)(ctx.app)
  if (!ctx.params.fromCache){
    // if there is a result
    if (ctx.result && (ctx.method === 'get' || ctx.method === 'find')) {
      const newKey = buildKey(ctx, customHash);
      // console.log('after::new key', newKey)
      cache.set(newKey, JSON.stringify(ctx.result));
      ctx.params.cached = true;
    }
  // if from cache, don't reset it
  }else if(ctx.method === 'find'){
    ctx.result.fromCache = true
  }

  return ctx;
};