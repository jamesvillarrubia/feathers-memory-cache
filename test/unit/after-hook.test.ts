
import { assert }from 'chai'
const { cacheAfter } = require('../../src/index')
import express from '@feathersjs/express'
import { HookContext } from '@feathersjs/hooks/lib';


describe('hook::after', () => {
  let ctx:HookContext;
  const app = express();

  beforeEach(() => {
    ctx = {
      arguments:null,
      path: 'books',
      params: {
        query: {
          $limit: 1,
          z: 'z'
        }
      },
      app
    }
    app.get('cache_local')? app.get('cache_local').cache.reset():null;
  });

  it('return cached=true ', async () => {
    const common = { ...ctx, method: 'get', result: { data: ['yes'] } };
    const result = await cacheAfter({ scope: 'local' })(common);
    assert.ok(result.params.cached);
  });

  it('does not return cached=true when from cache', async () => {
    const common = { ...ctx, method: 'get', result: { data: ['yes'] }, params: { ...ctx.params, fromCache: true } };
    const result = await cacheAfter({ scope: 'local' })(common);
    assert.notOk(result.params.cached);
  });

  it('return fromCache with FIND', async () => {
    const common = { ...ctx, method: 'get', result: { data: ['yes'] }, params: { ...ctx.params, fromCache: true } };
    const result = await cacheAfter({ scope: 'local' })(common);
    assert.ok(result.params.fromCache);
  });

  it('return value', async () => {
    const { cache, customHash, buildKey } = app.get('cache_local')
    const common = { ...ctx, method: 'get', result: { data: ['yes'] } };
    const key = buildKey(common, customHash);
    const { result } = await cacheAfter({ scope: 'local' })(common);
    const cached = JSON.parse(cache.get(key));
    assert.deepEqual(cached, result);
  });

  it('respects $skipCacheHook', async () => {
    const { result } = await cacheAfter({ scope: 'local' })({ ...ctx, params: { ...ctx.params, $skipCacheHook: true } });
    assert.isUndefined(result);
  });

});
