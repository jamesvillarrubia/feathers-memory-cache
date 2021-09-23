
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
let LRU = require('lru-cache');

const { after } = require('../lib/hooks')
const { getKey } = require('../lib/utils')

const assert = chai.assert;
chai.use(chaiAsPromised);

describe('hook::after', () => {
    let scopes
    let ctx
    let first
    let second 
    let third
    let fourth
    beforeEach(() => {
      scopes = {
        'cache_local': new LRU(),
        'cache_Global': new LRU()
      }
      ctx = {
        app:{
          get: (scope)=>{
            return scopes[scope]
          }
        },
        path:'books',
        params:{
          query:{
            $limit:1,
            z:'z'
          }
        }
      }
      
    })

    it('return cached=true ',async()=>{
      let cache = scopes['cache_local']
      let common = {...ctx, method:'get', result:{data:["yes"]}}
      let key = getKey(common)
      let result = await after({scope:'local'})(common)
      assert.ok(result.params.cached)
    })

    it('return value',async()=>{
      let cache = scopes['cache_local']
      let common = {...ctx, method:'get', result:{data:["yes"]}}
      let key = getKey(common)
      let { result } = await after({scope:'local'})(common)
      let cached = JSON.parse(cache.get(key))
      assert.deepEqual(cached, result)
    })

    it('respects $skipCacheHook',async()=>{
      let cache = scopes['cache_local']
      let { result } = await after({scope:'local'})({...ctx, params:{...ctx.params, $skipCacheHook:true}})
      assert.isUndefined(result)
    })
  })