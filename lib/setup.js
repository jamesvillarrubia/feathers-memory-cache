
const LRU = require('lru-cache');
const { purge, purgeScope, getKey, hashCode } = require('./utils');



const setup = (options = {}) => (app) => {
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

  let cache = new LRU(options);
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

module.exports = setup;
