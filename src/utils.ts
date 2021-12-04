import * as qs from 'qs';
import { HookContext } from '@feathersjs/feathers';

export interface CustomHash {
  (ctx:HookContext): string;
}

export interface CustomKey {
  (ctx:HookContext, customHash?:CustomHash): string;
}

// Collisions are possible with this code but not likely
export function hashCode (s:string): string {
  let h;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return String(h||'');
}


// This function returns repeatable key based on the contents of the ctx.
// Keys should be idempotent 
export const getKey:CustomKey = (ctx:  HookContext, customHash:Function ) => {
  ctx.params = ctx.params || {};
  const q = ctx.params.query || {};
  const p = ctx.params.paginate === false ? 'disabled' : 'enabled';
  let path = `pagination-ctx:${p}::${ctx.path}`;
  let idHash = '';
  let auth = '';
  let hash = '';

  // console.log(ctx.params)
  if(ctx.params.authenticated){
    const entity = ctx.app.get('authentication').entity;
    let e = ctx.params[`${entity}`] || {}
    let authentication = ctx.params.authentication || {}
    auth = JSON.stringify({[entity]:e,authentication})
  }

  // if there's an id, append it to the path and create and idHash
  if (ctx.id) {
    path += `/${ctx.id}`;
    idHash = hashCode(`/${ctx.id}`);
  }

  // if there is a query, append that string to the path
  if (Object.keys(q).length > 0) {
    path += `?${qs.stringify(JSON.parse(JSON.stringify(q)), { encode: false })}`;
  }

  if (customHash && typeof customHash === 'function'){
    hash = `${customHash(ctx)}`;
  }

  // return the key in the following format:
  // {service}_{id}_{key}_{auth}
  // where each {...} is hashed independently and {id}, {auth},and {customHash} are optional
  // {books}{/1234}{pagination-ctx:enabled::books/id?q=xxx&y=zzz}{auth}{customFunc}

  return `${hashCode(ctx.path||'')}_${idHash}_${hashCode(path)}_${hashCode(auth)||''}_${hashCode(hash)||''}`;

}

// This iterates through ALL of the keys and deletes any with a matching path AND id `{path}_{id}_`
export const purgeId = (scope = 'Global') => (ctx:HookContext) => {
  const { cache } = ctx.app.get(`cache_${scope}`)

  if (ctx.id) {
    let pathHash = hashCode(`${ctx.path}`);
    let idHash = hashCode(`/${ctx.id}`);
    cache.forEach((_value:any, key:string, cache:any ) => {
      if (key.indexOf(`${pathHash}_${idHash}_`) === 0) {
        cache.del(key);
      }
    });
  }
};

// This iterates through ALL of the keys and deletes any with a matching path AND No ID `{path}__`
export const purgeFind = (scope = 'Global') => (ctx:HookContext) => {
  const { cache } = ctx.app.get(`cache_${scope}`)
    let pathHash = hashCode(`${ctx.path}`);
    cache.forEach((_value:any, key:string, cache:any ) => {
      if (key.indexOf(`${pathHash}__`) === 0) {
        cache.del(key);
      }
    });
};


// This iterates through ALL of the keys and deletes any with a matching path (no id and id) `{path}_`
export const purgePath = (scope = 'Global') => (ctx:HookContext) => {
  const { cache } = ctx.app.get(`cache_${scope}`)

  if (ctx.path) {
    let pathHash = hashCode(ctx.path);
    cache.forEach((_value:any, key:String, cache:any ) => {
      if (key.indexOf(`${pathHash}_`) === 0) {
        cache.del(key);
      }
    });
  }
};

// Cleans out the entire cache by scope
export const purge = (scope = 'Global') => (ctx:HookContext) => {
  const { cache } = ctx.app.get(`cache_${scope}`)
  cache.reset();
};
