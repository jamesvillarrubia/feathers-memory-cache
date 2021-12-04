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
import { Options } from './setup';
import { HookContext } from '@feathersjs/feathers';
export declare const before: (options?: Options) => (ctx: HookContext) => Promise<HookContext<import("@feathersjs/feathers").Application<any, any>, any>>;
export declare const after: (options?: Options) => (ctx: HookContext) => Promise<HookContext<import("@feathersjs/feathers").Application<any, any>, any>>;
