
  let LRU = require('lru-cache');

  const setup = (options={}) => (app)=>{
    options = {
      max: 500, 
      maxAge: 1000 * 60 * 5,
      key: typeof options.key === 'function' ? options.key: getKey,
      ...options,
      ...app.get('cache')
    };
      
    let scope = typeof options.scope == 'string' ? `cache_${options.scope}`:'cache_Global'
    let cache = app.get(scope);
    if(!app.get('cache_Global')){
      cache = new LRU(options);
      app.set(scope, {...cache, getKey});
    }
    return cache;
  };

  module.exports = setup