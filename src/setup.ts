
import { getKey, CustomKey, CustomHash } from './utils';
import { Application } from '@feathersjs/feathers';
import LRUCache from 'lru-cache';

export type Methods = 'get' | 'find' | 'create' | 'update' | 'patch'
interface Key {}
interface Value {}

export interface Options extends LRUCache.Options<Key, Value> {
  scope?: string;
  customHash?: CustomHash;
  key?: CustomKey;
  allowedMethods?:Methods[];
  purgeOnMutate?:Methods[];
  //... plus any options passed by LRUCache.Options
}

export const setDefaultOptions = (options:Options):Options => {
  return {
    scope: 'Global',
    allowedMethods:['get','find'],
    purgeOnMutate:['get'],
    customHash:()=>'',
    key: getKey,
    max: 500,
    maxAge: 1000 * 60 * 5,
    ...options
  };
}

export interface storedCache{
  cache: LRUCache<Key, Value>;
  customHash: CustomHash;
  buildKey: CustomKey;
}

export const setup = (options:Options) => (app:Application):storedCache => {

  const { customHash, key: buildKey } = setDefaultOptions({
    ...options,
    ...app.get('in-mem-cache') // get default settings from config
  });

  const storedScope = typeof options.scope === 'string' ? `cache_${options.scope}` : 'cache_Global';

  //prevents overwriting
  if(app.get(storedScope)){
    return app.get(storedScope)
  }
  let cache = new LRUCache(options);

  app.set(storedScope, {
    cache,
    customHash,
    buildKey
  });
  // console.log('been set', app.get(scope), customHash())
  return {
    cache,
    customHash,
    buildKey
  }
};
