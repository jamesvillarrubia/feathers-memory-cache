import { assert }from 'chai'
import { BaseHookContext } from '@feathersjs/hooks/lib';

import LRUCache from 'lru-cache';

// const { cacheBefore, cacheAfter, cache  } = require('../src/index')
const { getKey, hashCode, purge, purgePath, purgeFind, purgeId } = require('../../src/utils');

// set max

// set maxAge

// set key function

// set scope

describe('hashCode', () => {
  it('returns same value when requesting twice', async () => {
    const first = hashCode('xxxx');
    const second = hashCode('xxxx');
    assert.strictEqual(first, second);
  });
  it('returns different values with different inputs', async () => {
    const first = hashCode('xxxx');
    const second = hashCode('xxx ');
    const third = hashCode('xxxyasefasefasd');
    // console.log(first, second, third)
    assert.notStrictEqual(first, second);
    assert.notStrictEqual(first, third);
  });
  it('returns values with long input > 2048', async () => {
    const first = hashCode('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');
    assert.ok(first.length > 0);
  });
});

describe('getKey', () => {
  let ctx = new BaseHookContext
  ctx = {
    params: {
      query: {
        $limit: 1,
        q: 'z',
        x: {
          $in: ['a', 'b', 'c']
        }
      },
      paginate: false,
      authenticated:true,
      user:{
        id:123,
        name:'etc'
      }
    },
    path: 'books',
    id: 15,
    app:{
      get:(field:string)=>{
        let o:any = { authentication: { entity: 'user' }};
        return o[field] 
      }
    },
    ...ctx
  }


  it('respects pagination setting', async () => {
    const first = getKey(ctx);
    const second = getKey({ ...ctx, params: { ...ctx.params, paginate: true } });
    // console.log(first,second)
    assert.notStrictEqual(first, second);
  });

  it('uses id when availabe', async () => {
    const first = getKey(ctx);
    const second = getKey({ ...ctx, id: undefined });
    assert.notStrictEqual(first, second);
  });

  it('uses path when available', async () => {
    const first = getKey(ctx);
    const second = getKey({ ...ctx, path: undefined, params: { ...ctx.params } });
    assert.notStrictEqual(first, second);
  });

  it('uses auth when available', async () => {
    const first = getKey({ ...ctx });
    const second = getKey({ ...ctx, params:{...ctx.params, authenticated:true, user:{
      id:1234,
      name:'etc'
    }}});
    const third = getKey({ ...ctx, params:{...ctx.params, authenticated:false }});
    assert.notStrictEqual(first, second);
    assert.notStrictEqual(first, third);
  });

  it('uses path as prefix', async () => {
    const first = getKey({ ...ctx, id: 15, params: { ...ctx.params, query: undefined } });
    const second = getKey({ ...ctx, id: 20 });
    const third = getKey({ ...ctx, id: null });
    // console.log('uses Path\n'+first,'\n',second,'\n',third)
    assert.notStrictEqual(first, second);
    assert.notStrictEqual(first, third);
    assert.notStrictEqual(second, third);

    const firstSlice = first.split('_').slice(0, 1)[0]
    const secondSlice = second.split('_').slice(0, 1)[0]
    const thirdSlice = third.split('_').slice(0, 1)[0]
    // console.log(firstSlice, secondSlice, thirdSlice)
    assert.strictEqual(firstSlice, secondSlice);
    assert.strictEqual(firstSlice, thirdSlice);
  });

  it('uses path and ID as prefix', async () => {
    const first = getKey({ ...ctx, id: 15, params: { ...ctx.params, query: undefined } });
    const second = getKey({ ...ctx, id: 15 });
    const third = getKey({ ...ctx, id: null });
    // console.log('uses Path\n'+first, '\n', second, '\n', third)
    assert.notStrictEqual(first, second);
    assert.notStrictEqual(first, third);

    const firstSlice = first.split('_').slice(0, 2).join('_');
    const secondSlice = second.split('_').slice(0, 2).join('_');
    const thirdSlice = third.split('_').slice(0, 2).join('_');
    // console.log(firstSlice, secondSlice, thirdSlice)
    assert.strictEqual(firstSlice, secondSlice);
    assert.notStrictEqual(firstSlice, thirdSlice);
  });
});

describe('purge', () => {
  let scopes:any;
  let ctx = new BaseHookContext;
  beforeEach(() => {
    scopes = {
      cache_Global: { cache: new LRUCache() },
      cache_local: { cache: new LRUCache() },
    };
    ctx = {
      app: {
        get: (scope:string) => {
          return scopes[scope];
        }
      }
    };
    scopes.cache_Global.cache.set('key', 'value');
    scopes.cache_local.cache.set('key', 'value');
  });

  it('purges only the scoped cache', async () => {
    assert.ok(scopes.cache_Global.cache.get('key'));
    assert.ok(scopes.cache_local.cache.get('key'));
    purge('local')(ctx);
    assert.isUndefined(scopes.cache_local.cache.get('key'));
  });

  it('purges global scope by default', async () => {
    purge()(ctx);
    assert.ok(scopes.cache_local.cache.get('key'));
    assert.isUndefined(scopes.cache_Global.cache.get('key'));
  });
});

describe('purgePath', () => {
  let scopes:any;
  let ctx = new BaseHookContext
  let first:string;
  let second:string;
  let third:string;
  beforeEach(() => {
    scopes = {
      cache_local: { cache: new LRUCache() },
    };
    ctx = {
      app: {
        get: (scope:string) => {
          return scopes[scope];
        }
      },
      path: 'books',
      params: {
        query: {
          $limit: 1,
          z: 'z'
        }
      }
    };
    first = getKey({ ...ctx, id: 15, params: { ...ctx.params, query: undefined } });
    second = getKey({ ...ctx, id: 15 });
    third = getKey({ ...ctx, id: null });
    let cache = scopes.cache_local.cache
    cache.set(first, 'value');
    cache.set(second, 'value');
    cache.set(third, 'value');
    cache.set('key', 'value');
  });

  it('purges only the scoped path', async () => {
    purgePath('local')(ctx);
    let cache = scopes.cache_local.cache
    assert.ok(cache.get('key'));
    assert.isUndefined(cache.get(first));
    assert.isUndefined(cache.get(second));
    assert.isUndefined(cache.get(third));
  });
});

describe('purgeId', () => {
  let scopes:any;
  let ctx = new BaseHookContext
  let first:string;
  let second:string;
  let third:string;
  let fourth:string;
  beforeEach(() => {
    scopes = {
      cache_local: { cache: new LRUCache() },
    };
    ctx = {
      app: {
        get: (scope:string) => {
          return scopes[scope];
        }
      },
      path: 'books',
      params: {
        query: {
          $limit: 1,
          z: 'z'
        }
      }
    };
    first = getKey({ ...ctx, id: 15, params: { ...ctx.params, query: undefined } });
    second = getKey({ ...ctx, id: 15 });
    third = getKey({ ...ctx, id: null });
    fourth = getKey({ ...ctx, id: 22 });
    let cache = scopes.cache_local.cache
    cache.set(first, 'value');
    cache.set(second, 'value');
    cache.set(third, 'value');
    cache.set(fourth, 'value');
  });

  it('purges only the scoped Ids', async () => {
    const cache = scopes.cache_local.cache;
    purgeId('local')({ ...ctx, id: 15 });
    assert.ok(cache.get(third));
    assert.ok(cache.get(fourth));
    assert.isUndefined(cache.get(first));
    assert.isUndefined(cache.get(second));
  });
});


describe('purgeFind', () => {
  let scopes:any;
  let ctx = new BaseHookContext
  let first:string;
  let second:string;
  let third:string;
  let fourth:string;
  beforeEach(() => {
    scopes = {
      cache_local: { cache: new LRUCache() },
    };
    ctx = {
      app: {
        get: (scope:string) => {
          return scopes[scope];
        }
      },
      path: 'books',
      params: {
        query: {
          $limit: 1,
          z: 'z'
        }
      }
    };
    first = getKey({ ...ctx,  params: { ...ctx.params, query: undefined } });
    second = getKey({ ...ctx, path:'buckets', params: { ...ctx.params, query: { id:1 }} });
    third = getKey({ ...ctx });
    fourth = getKey({ ...ctx, id:15 });

    let cache = scopes.cache_local.cache
    cache.set(first, 'value');
    cache.set(second, 'value');
    cache.set(third, 'value');
    cache.set(fourth, 'value');

  });

  it('purges only the finds', async () => {
    const cache = scopes.cache_local.cache;
    purgeFind('local')({ ...ctx });
    assert.ok(cache.get(second));
    assert.ok(cache.get(fourth));
    assert.isUndefined(cache.get(first));
    assert.isUndefined(cache.get(third));
  });
});
