const qs = require('querystring');

// Collisions are possible with this code but not likely
function hashCode (s) {
  let h;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return String(h||'');
}


// This function returns repeatable key based on the contents of the hook.
// Keys should be idempotent 
function getKey (hook, customHash) {
  hook.params = hook.params || {};
  const q = hook.params.query || {};
  const p = hook.params.paginate === false ? 'disabled' : 'enabled';
  let path = `pagination-hook:${p}::${hook.path}`;
  let idHash = '';
  let auth = '';
  let hash = '';

  // console.log(hook.params)
  if(hook.params.authenticated){
    const entity = hook.app.get('authentication').entity;
    let e = hook.params[`${entity}`] || {}
    let authentication = hook.params.authentication || {}
    auth = JSON.stringify({[entity]:e,authentication})
  }

  // if there's an id, append it to the path and create and idHash
  if (hook.id) {
    path += `/${hook.id}`;
    idHash = hashCode(`/${hook.id}`);
  }

  // if there is a query, append that string to the path
  if (Object.keys(q).length > 0) {
    path += `?${qs.stringify(JSON.parse(JSON.stringify(q)), { encode: false })}`;
  }

  if (customHash && typeof customHash === 'function'){
    hash = `${customHash(hook)}`;
  }

  // return the key in the following format:
  // {service}_{id}_{key}_{auth}
  // where each {...} is hashed independently and {id}, {auth},and {customHash} are optional
  // {books}{/1234}{pagination-hook:enabled::books/id?q=xxx&y=zzz}{auth}{customFunc}

  return `${hashCode(hook.path||'')}_${idHash}_${hashCode(path)}_${hashCode(auth)||''}_${hashCode(hash)||''}`;

}

// This iterates through ALL of the keys and deletes any with a matching path AND id `{path}{id}`
const purgeId = (scope = 'Global') => (ctx) => {
  const { cache, customHash } = ctx.app.get(`cache_${scope}`)

  if (ctx.id) {
    pathHash = hashCode(`${ctx.path}`);
    idHash = hashCode(`/${ctx.id}`);
    cache.forEach((value, key, cache) => {
      if (key.indexOf(`${pathHash}_${idHash}_`) === 0) {
        cache.del(key);
      }
    });
  }
};

// This iterates through ALL of the keys and deletes any with a matching path and any ID `{path}`
const purgePath = (scope = 'Global') => (ctx) => {
  const { cache } = ctx.app.get(`cache_${scope}`)


  if (ctx.path) {
    pathHash = hashCode(ctx.path);
    cache.forEach((value, key, cache) => {
      if (key.indexOf(`${pathHash}_`) === 0) {
        cache.del(key);
      }
    });
  }
};

// Cleans out the entire cache by scope
const purge = (scope = 'Global') => (ctx) => {
  const { cache, customHash } = ctx.app.get(`cache_${scope}`)
  cache.reset();
};

module.exports = {
  purge,
  purgeId,
  purgePath,
  getKey,
  hashCode
};
