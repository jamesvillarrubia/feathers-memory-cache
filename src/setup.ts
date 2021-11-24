
import { getKey } from './utils';
import { Application } from '@feathersjs/feathers';
import LRUCache from 'lru-cache';


export const setup = (options:any = {}) => (app:Application) => {
  options = {
    max: 500,
    maxAge: 1000 * 60 * 5,
    ...options,
    ...app.get('cache') // get default settings
  };
  const customHash = typeof options.customHash === 'function' ? options.customHash : ()=>''
  const buildKey = typeof options.key === 'function' ? options.key : getKey

  const scope = typeof options.scope === 'string' ? `cache_${options.scope}` : 'cache_Global';
  if(app.get(scope)){
    return app.get(scope)
  }

  // console.log('typeof',typeof options.customHash)
  // console.log('customHash', customHash())

  let cache = new LRUCache(options);
  app.set(scope, {
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
