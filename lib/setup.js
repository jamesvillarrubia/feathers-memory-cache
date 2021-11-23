
const LRU = require('lru-cache');
const { purge, purgeScope, getKey, hashCode } = require('./utils');

const setup = (options = {}) => (app) => {
  options = {
    max: 500,
    maxAge: 1000 * 60 * 5,
    ...options,
    ...app.get('cache')
  };
  const customFn = typeof options.customFn === 'function' ? options.customFn:()=>''
  const scope = typeof options.scope === 'string' ? `cache_${options.scope}` : 'cache_Global';
  let cache = new LRU(options);
  app.set(scope, {cache,customElements});
  return cache;
};

module.exports = setup;
