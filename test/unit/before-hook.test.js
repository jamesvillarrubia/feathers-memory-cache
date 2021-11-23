
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
// const express = require('@feathersjs/express');
const express = require('express');


const { before:beforeHook } = require('../../lib/hooks');
const setup = require('../../lib/setup')

const assert = chai.assert;
chai.use(chaiAsPromised);

describe('hook::before', () => {
  let scopes;
  let ctx;
  let first;
  let second;
  let third;
  let fourth;
  const app = express();
  beforeEach(() => {
    setup({scope:'limit', max:1})(app)
    setup({scope:'fast', maxAge:1})(app)
    setup({scope:'slow', maxAge:100000})(app)
    setup({scope:'local'})(app)
    setup({})(app)
    ctx = {
      app,
      path: 'books',
      params: {
        query: {
          $limit: 1,
          z: 'z'
        }
      }
    };
    const { cache, buildKey } = app.get('cache_local')
    first = buildKey({ ...ctx, id: 15, params: { ...ctx.params, query: undefined } });
    second = buildKey({ ...ctx, id: 15 });
    third = buildKey({ ...ctx, id: null });
    fourth = buildKey({ ...ctx, id: 22 });
    cache.set(first, 'value');
    cache.set(second, 'value');
    cache.set(third, 'value');
    cache.set(fourth, 'value');
  });

  it('use id for GET', async () => {
    const { cache, buildKey } = app.get('cache_local')
    const noIdKey = buildKey({ ...ctx, method: 'find' });
    const yesIdKey = buildKey({ ...ctx, id: 1, method: 'get' });
    cache.set(noIdKey, JSON.stringify({ data: 'noId' }));
    cache.set(yesIdKey, JSON.stringify({ data: 'yesId' }));

    const { result: yesIdResult } = await beforeHook({ scope: 'local' })({ ...ctx, id: 1, method: 'get' });
    const { result: noIdResult } = await beforeHook({ scope: 'local' })({ ...ctx, method: 'find' });

    assert.strictEqual(yesIdResult.data, 'yesId');
    assert.strictEqual(noIdResult.data, 'noId');
  });

  it('set fromCache with FIND', async () => {
    const { cache, buildKey } = app.get('cache_local')
    const noIdKey = buildKey({ ...ctx, method: 'get' });
    cache.set(noIdKey, JSON.stringify({ data: 'noId' }));
    const { result: noIdResult, params } = await beforeHook({ scope: 'local' })({ ...ctx, method: 'find' });
    assert.strictEqual(noIdResult.data, 'noId');
    assert.ok(params.fromCache);
  });

  it('respects $skipCacheHook', async () => {
    const { result } = await beforeHook({ scope: 'local' })({ ...ctx, params: { ...ctx.params, $skipCacheHook: true } });
    assert.isUndefined(result);
  });

  it('resets id paths on PATCH, UPDATE, CREATE', async () => {
    const { cache, buildKey } = app.get('cache_local')
    const getK = buildKey({ ...ctx, id: 1, method: 'get' });
    cache.set(getK, JSON.stringify({ data: 'get' }));
    const findK = buildKey({ ...ctx, method: 'find' });
    cache.set(findK, JSON.stringify({ data: 'find' }));
    const { result } = await beforeHook({ scope: 'local' })({ ...ctx, id: 1, method: 'patch' });
    assert.isUndefined(result);
    assert.isUndefined(cache.get(getK));
    assert.ok(cache.get(findK));
  });

  it('respects max size', async () => {
    const { cache, buildKey } = app.get('cache_limit')
    const first = buildKey({ ...ctx, id: 2, method: 'get' });
    const second = buildKey({ ...ctx, id: 1, method: 'get' });
    cache.set(first, JSON.stringify({ data: 'noId' }));
    cache.set(second, JSON.stringify({ data: 'yesId' }));

    const { result: firstResult } = await beforeHook({ scope: 'limit' })({ ...ctx, id: 1, method: 'get' });
    const { result: secondResult } = await beforeHook({ scope: 'limit' })({ ...ctx, id: 2, method: 'get' });
    
    assert.strictEqual(firstResult.data, 'yesId');
    assert.isUndefined(secondResult);
  });

  it('respects maxAge/TTL', async () => {
    let fast = app.get('cache_fast')
    let slow = app.get('cache_slow')
    const fastKey = fast.buildKey({ ...ctx, id: 1, method: 'get' });
    const slowKey = slow.buildKey({ ...ctx, id: 2, method: 'get' });
    fast.cache.set(fastKey, JSON.stringify({ data: 'fast' }));
    slow.cache.set(slowKey, JSON.stringify({ data: 'slow' }));

    await new Promise(resolve => setTimeout(resolve, 10));
    const { result: fastResult } = await beforeHook({ scope: 'fast' })({ ...ctx, id: 1, method: 'get' });
    const { result: slowResult } = await beforeHook({ scope: 'slow' })({ ...ctx, id: 2, method: 'get' });
    assert.strictEqual(slowResult.data, 'slow');
    assert.isUndefined(fastResult);
  });



});
