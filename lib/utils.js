const qs = require('querystring')



// Collisions are possible with this code but not likely
function hashCode(s){
    let h;
    for (let i = 0; i < s.length; i++) {
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return String(h);
}
  

function getKey(hook) {
    hook.params = hook.params || {}
    const q = hook.params.query || {};
    const p = hook.params.paginate === false ? 'disabled' : 'enabled';
    let path = `pagination-hook:${p}::${hook.path}`;
    let idHash = ''
    
    if (hook.id) {
        path += `/${hook.id}`;
        idHash = hashCode(`/${hook.id}`);
    }

    if (Object.keys(q).length > 0) {
        path += `?${qs.stringify(JSON.parse(JSON.stringify(q)), { encode: false })}`;
    }

    // {prefix}{group}{key}
    return `${hashCode(hook.path)}_${idHash}_${hashCode(path)}`;
    // prefix{books}{/1234}{pagination-hook:enabled::books/id?q=xxx&y=zzz}
}


// This iterates through ALL of the keys and deletes any with a matching path AND id `{path}{id}`
const purgeId = (scope = 'Global') => (ctx) => {
    let cache = ctx.app.get(`cache_${scope}`);

    if (ctx.id) {
        pathHash = hashCode(`${ctx.path}`)
        idHash = hashCode(`/${ctx.id}`)
        cache.forEach((value,key,cache)=>{
            if(key.indexOf(`${pathHash}_${idHash}_`) === 0){
                cache.del(key)
            }
        })
    }
    
}

// This iterates through ALL of the keys and deletes any with a matching path and any ID `{path}`
const purgePath = (scope = 'Global') => (ctx) => {
    let cache = ctx.app.get(`cache_${scope}`);

    if (ctx.path) {
        pathHash = hashCode(ctx.path)
        cache.forEach((value,key,cache)=>{
            if(key.indexOf(`${pathHash}_`) === 0){
                cache.del(key)
            }
        })
    }
}

// Cleans out the entire cache by scope
const purge = (scope = 'Global') => (ctx) => {
    let cache = ctx.app.get(`cache_${scope}`);
    cache.reset();
}

module.exports = {
    purge,
    purgeId,
    purgePath,
    getKey,
    hashCode
}