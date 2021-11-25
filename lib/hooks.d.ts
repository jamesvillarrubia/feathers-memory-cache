/****** CACHE README
 * Cache is shared within the instance as a global state.  For multi-instance, multi-container caching, use feathers-redis-cache.
 * Configuration is global by default but can be made on a per-service basis.
*/
import { CustomHash, CustomKey } from './utils';
import { HookContext } from '@feathersjs/feathers';
export interface Options {
    scope?: string;
    customHash?: CustomHash;
    key?: CustomKey;
    [x: string]: any;
}
export declare const before: (options?: Options) => (ctx: HookContext) => Promise<HookContext<import("@feathersjs/feathers").Application<any, any>, any>>;
export declare const after: (options?: Options) => (ctx: HookContext) => Promise<HookContext<import("@feathersjs/feathers").Application<any, any>, any>>;
