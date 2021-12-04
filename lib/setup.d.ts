import { CustomKey, CustomHash } from './utils';
import { Application } from '@feathersjs/feathers';
import LRUCache from 'lru-cache';
export declare type Methods = 'get' | 'find' | 'create' | 'update' | 'patch';
interface Key {
}
interface Value {
}
export interface Options extends LRUCache.Options<Key, Value> {
    scope?: string;
    customHash?: CustomHash;
    key?: CustomKey;
    allowedMethods?: Methods[];
    purgeOnMutate?: Methods[];
}
export declare const setDefaultOptions: (options: Options) => Options;
export interface storedCache {
    cache: LRUCache<Key, Value>;
    customHash: CustomHash;
    buildKey: CustomKey;
}
export declare const setup: (options: Options) => (app: Application) => storedCache;
export {};
