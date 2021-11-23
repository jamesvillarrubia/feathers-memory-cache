
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const LRU = require('lru-cache');

const { after:afterHook } = require('../../lib/hooks');
const setup = require('../../lib/setup')
const express = require('@feathersjs/express');

const assert = chai.assert;
chai.use(chaiAsPromised);

describe('hook::after', () => {
  let scopes = {};
  let ctx;
  let first;
  let second;
  let third;
  let fourth;
  const app = express();
  beforeEach(() => {
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
  });

  it('return cached=true ', async () => {
    const common = { ...ctx, method: 'get', result: { data: ['yes'] } };
    const result = await afterHook({ scope: 'local' })(common);
    assert.ok(result.params.cached);
  });

  it('does not return cached=true when from cache', async () => {
    const common = { ...ctx, method: 'get', result: { data: ['yes'] }, params: { ...ctx.params, fromCache: true } };
    const result = await afterHook({ scope: 'local' })(common);
    assert.notOk(result.params.cached);
  });

  it('return fromCache with FIND', async () => {
    const common = { ...ctx, method: 'get', result: { data: ['yes'] }, params: { ...ctx.params, fromCache: true } };
    const result = await afterHook({ scope: 'local' })(common);
    assert.ok(result.params.fromCache);
  });

  it('return value', async () => {
    const { cache, customHash, buildKey } = app.get('cache_local')
    const common = { ...ctx, method: 'get', result: { data: ['yes'] } };
    const key = buildKey(common, customHash);
    const { result } = await afterHook({ scope: 'local' })(common);
    const cached = JSON.parse(cache.get(key));
    assert.deepEqual(cached, result);
  });

  it('respects $skipCacheHook', async () => {
    const { result } = await afterHook({ scope: 'local' })({ ...ctx, params: { ...ctx.params, $skipCacheHook: true } });
    assert.isUndefined(result);
  });



});
