
const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');
const memory = require('feathers-memory');
const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
let LRU = require('lru-cache');


// const { cacheBefore, cacheAfter, cache  } = require('../lib/index')
const { before, after, setup } = require('../lib/hooks')
const { getKey, hashCode, purge, purgePath, purgeId } = require('../lib/utils')

const assert = chai.assert;
chai.use(chaiAsPromised);
const app = express(feathers());

describe('hook::before', () => {
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
      
      first = getKey({...ctx, id:15, params:{...ctx.params, query:undefined}})
      second = getKey({...ctx, id:15})
      third = getKey({...ctx, id:null})
      fourth = getKey({...ctx, id:22})
      scopes['cache_local'].set(first,'value')
      scopes['cache_local'].set(second,'value')
      scopes['cache_local'].set(third,'value')
      scopes['cache_local'].set(fourth,'value')
    })
    
    // it('allows options override',async()=>{
    //   let cache = scopes['cache_local']
    //   assert.isUndefined('key')
    // })

    it('use id for GET',async()=>{
      let cache = scopes['cache_local']
      let noIdKey = getKey({...ctx, method:'find'})
      let yesIdKey = getKey({...ctx, id:1, method:'get'})
      cache.set(noIdKey, JSON.stringify({data:'noId'}))
      cache.set(yesIdKey, JSON.stringify({data:'yesId'}))

      let { result: yesIdResult } = await before({scope:'local'})({...ctx, id:1, method:'get'})
      let { result: noIdResult } = await before({scope:'local'})({...ctx, method:'find'})
   
      assert.strictEqual(yesIdResult.data, 'yesId')
      assert.strictEqual(noIdResult.data, 'noId')
    })

    it('return fromCache with FIND',async()=>{
      let cache = scopes['cache_local']
      let noIdKey = getKey({...ctx, method:'get'})
      cache.set(noIdKey, JSON.stringify({data:'noId'}))
      let { result: noIdResult } = await before({scope:'local'})({...ctx, method:'find'})
      assert.strictEqual(noIdResult.data, 'noId')
      assert.ok(noIdResult.fromCache)
    })

    it('respects $skipCacheHook',async()=>{
      let cache = scopes['cache_local']
      let { result } = await before({scope:'local'})({...ctx, params:{...ctx.params, $skipCacheHook:true}})
      assert.isUndefined(result)
    })

    it('resets id paths on PATCH, UPDATE, CREATE',async()=>{
      let cache = scopes['cache_local']
      let getK = getKey({...ctx, id:1, method:'get'})
      cache.set(getK, JSON.stringify({data:'get'}))
      let findK = getKey({...ctx, method:'find'})
      cache.set(findK, JSON.stringify({data:'find'}))
      let { result } = await before({scope:'local'})({...ctx, id:1, method:'patch'})
      assert.isUndefined(result)
      assert.isUndefined(cache.get(getK))
      assert.ok(cache.get(findK))
    })
  })