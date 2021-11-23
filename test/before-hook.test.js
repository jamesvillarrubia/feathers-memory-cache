
const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');
const memory = require('feathers-memory');
const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const LRU = require('lru-cache');

const { before:beforeHook } = require('../lib/hooks');
const { getKey, hashCode, purge, purgePath, purgeId } = require('../lib/utils');

const assert = chai.assert;
chai.use(chaiAsPromised);
const app = express(feathers());

describe('hook::before', () => {
  let scopes;
  let ctx;
  let first;
  let second;
  let third;
  let fourth;
  beforeEach(() => {
    scopes = {
      cache_local: new LRU(),
      cache_Global: new LRU(),
      cache_limit: new LRU({max:1}),
      cache_fast: new LRU({maxAge:1}),
      cache_slow: new LRU({maxAge:100000})
    };
    ctx = {
      app: {
        get: (scope) => {
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
    scopes.cache_local.set(first, 'value');
    scopes.cache_local.set(second, 'value');
    scopes.cache_local.set(third, 'value');
    scopes.cache_local.set(fourth, 'value');
  });

  it('use id for GET', async () => {
    const cache = scopes.cache_local;
    const noIdKey = getKey({ ...ctx, method: 'find' });
    const yesIdKey = getKey({ ...ctx, id: 1, method: 'get' });
    cache.set(noIdKey, JSON.stringify({ data: 'noId' }));
    cache.set(yesIdKey, JSON.stringify({ data: 'yesId' }));

    const { result: yesIdResult } = await beforeHook({ scope: 'local' })({ ...ctx, id: 1, method: 'get' });
    const { result: noIdResult } = await beforeHook({ scope: 'local' })({ ...ctx, method: 'find' });

    assert.strictEqual(yesIdResult.data, 'yesId');
    assert.strictEqual(noIdResult.data, 'noId');
  });

  it('set fromCache with FIND', async () => {
    const cache = scopes.cache_local;
    const noIdKey = getKey({ ...ctx, method: 'get' });
    cache.set(noIdKey, JSON.stringify({ data: 'noId' }));
    const { result: noIdResult, params } = await beforeHook({ scope: 'local' })({ ...ctx, method: 'find' });
    assert.strictEqual(noIdResult.data, 'noId');
    assert.ok(params.fromCache);
  });

  it('respects $skipCacheHook', async () => {
    const cache = scopes.cache_local;
    const { result } = await beforeHook({ scope: 'local' })({ ...ctx, params: { ...ctx.params, $skipCacheHook: true } });
    assert.isUndefined(result);
  });

  it('resets id paths on PATCH, UPDATE, CREATE', async () => {
    const cache = scopes.cache_local;
    const getK = getKey({ ...ctx, id: 1, method: 'get' });
    cache.set(getK, JSON.stringify({ data: 'get' }));
    const findK = getKey({ ...ctx, method: 'find' });
    cache.set(findK, JSON.stringify({ data: 'find' }));
    const { result } = await beforeHook({ scope: 'local' })({ ...ctx, id: 1, method: 'patch' });
    assert.isUndefined(result);
    assert.isUndefined(cache.get(getK));
    assert.ok(cache.get(findK));
  });

  it('respects max size', async () => {
    const cache = scopes.cache_limit;
    
    const first = getKey({ ...ctx, id: 2, method: 'get' });
    const second = getKey({ ...ctx, id: 1, method: 'get' });
    cache.set(first, JSON.stringify({ data: 'noId' }));
    cache.set(second, JSON.stringify({ data: 'yesId' }));

    const { result: firstResult } = await beforeHook({ scope: 'limit' })({ ...ctx, id: 1, method: 'get' });
    const { result: secondResult } = await beforeHook({ scope: 'limit' })({ ...ctx, id: 2, method: 'get' });
    
    assert.strictEqual(firstResult.data, 'yesId');
    assert.isUndefined(secondResult);
  });

  it('respects maxAge/TTL', async () => {
    const fastKey = getKey({ ...ctx, id: 1, method: 'get' });
    const slowKey = getKey({ ...ctx, id: 2, method: 'get' });
    scopes.cache_fast.set(fastKey, JSON.stringify({ data: 'fast' }));
    scopes.cache_slow.set(slowKey, JSON.stringify({ data: 'slow' }));

    await new Promise(resolve => setTimeout(resolve, 10));
    const { result: fastResult } = await beforeHook({ scope: 'fast' })({ ...ctx, id: 1, method: 'get' });
    const { result: slowResult } = await beforeHook({ scope: 'slow' })({ ...ctx, id: 2, method: 'get' });
    assert.strictEqual(slowResult.data, 'slow');
    assert.isUndefined(fastResult);
  });



});
