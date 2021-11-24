import { assert }from 'chai'
// const chai = require('chai')
// import chaiAsPromised from 'chai-as-promised'
// const chaiAsPromised = require('chai-as-promised')
import { memory } from '@feathersjs/memory'
import express from '@feathersjs/express'
import { feathers } from '@feathersjs/feathers';
import { NotAuthenticated, BadRequest } from '@feathersjs/errors'
import { HookContext } from '@feathersjs/feathers';

const { cacheBefore, cacheAfter } = require('../../src/index')

const app = express(feathers());
// app.configure(express.rest());

// TODO - setup test
interface User {
  username?:String;
  password?:String;
  id?:any
  [x:string]:any;
}


describe('service', () => {
  let user1:User;
  let user2:User;
  before(async ()=>{
    app.set('cache_Global', undefined)
    app.set('authentication', {
      entity:'user'
    })
    await app.use('/users', memory({
      paginate: {
        default: 1,
        max: 2,
      }
    }));

    await app.service('users').hooks({
      before: {
        all: [
          cacheBefore(),
          (ctx:HookContext)=>{if(ctx.params.user && ctx.params.user.id === 4){throw new NotAuthenticated()}},
        ]
      },
      after: {
        all: [
          (ctx:HookContext)=>{if(ctx.params.user && ctx.params.user.id === 5){throw new BadRequest()}},
          cacheAfter()
        ]
      }
    });
    await app.setup();

    user1 = await app.service('users').create({
      username: 'user1',
      password: 'password'
    })
    user2 = await app.service('users').create({
      username: 'user2',
      password: 'password'
    })
  //   // done()
  })
  beforeEach(()=>{
    if(app.get('cache_Global')){
      app.get('cache_Global').cache.reset()
    }
  })

  it('returns same value when requesting twice empty', async () => {
    let query = {
      username: 'user0',
      $limit: 10
    };
    let result1 = await app.service('users').find({ query }); //no cache yet
    let result2 = await app.service('users').find({ query }); //yes cached
    assert.isUndefined(result1.fromCache);
    assert.strictEqual(result2.fromCache, true);
    assert.deepEqual(result1.data, result2.data);
    assert.ok(true)
  });

  it('returns same value when requesting twice', async () => {
    let query = {
      username:'David',
      $limit:10
    };
    let result = await app.service('users').find({query});
    let result2 = await app.service('users').find({query});
    assert.strictEqual(result2.fromCache, true);
    assert.deepEqual(result.data, result2.data);
  });

  it('invalidates cache after update', async () => {    
    let result1:User = await app.service('users').get(user2.id);
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1) // cache at one
    let result2:User = await app.service('users').update(user2.id,{...user2,new:true});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 0) // cache back to zero
    await app.service('users').get(user2.id);
    assert.isUndefined(result1.new); // no modified yet
    assert.isOk(result2.new); // modification went through
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1) // cache back to one
    
  });

  it('denies cache with different auth', async () => {
    await app.service('users').find({query:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 2);
    await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCDE'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 3);
    await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user1.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 4);
  })
  it('allows cache with same auth', async () => {
    await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1);
  })

  it('disallows cache of error with unauthed', async () => {
    try {
      await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:4}});
    }catch(e:any){
      assert.strictEqual(e.className, 'not-authenticated')
    }
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 0); // cache at one
  })

  it('disallows cache of after hook error', async () => {
    try {
      await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:5}});
    }catch(e:any){
      assert.strictEqual(e.className, 'bad-request')
    }
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 0); // cache at one
  })


  it('allows caching of different pages', async () => {
    await app.service('users').find({query:{$limit:1,$skip:0}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    await app.service('users').find({query:{$limit:1,$skip:0}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    await app.service('users').find({query:{$limit:1,$skip:2}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 2); // cache at one
  });

  it('allows same caching of default limit vs enforced', async () => {
    await app.service('users').find();
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    await app.service('users').find({query:{$skip:1}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 2); // cache at one
  });


  it('allows custom key function', async () => {
    await app.use('/birds', memory({
      paginate: {
        default: 1,
        max: 2,
      }
    }));
    app.service('birds').hooks({
      before: {
        all: [
          cacheBefore({
            scope:"birds",
            key:(ctx:HookContext)=>{ return ctx.method}
          }),
        ]
      },
      after: {
        all: [
          cacheAfter({scope:"birds"})
        ]
      }
    });
    await app.setup()
    await app.service('birds').create({})
    await app.service('birds').find();
    assert.strictEqual(app.get('cache_birds').cache.itemCount, 1); // cache at one
    await app.service('birds').find({query:{id:1}});
    assert.strictEqual(app.get('cache_birds').cache.itemCount, 1); // cache at one

  })

  it('allows custom hash function', async () => {
    await app.use('/gators', memory({
      paginate: {
        default: 1,
        max: 2,
      }
    }));
    await app.service('gators').hooks({
      before: {
        all: [
          cacheBefore({
            scope:"gators",
            customHash:()=>{ 
              return `${Math.round(Math.random()*1000)}`
            }
          }),
        ]
      },
      after: {
        all: [
          cacheAfter({scope:"gators"})
        ]
      }
    });
    await app.setup()
    await app.service('gators').create({})
    await app.service('gators').find();
    assert.strictEqual(app.get('cache_gators').cache.itemCount, 1); // cache at one    
    await app.service('gators').find();
    assert.strictEqual(app.get('cache_gators').cache.itemCount, 2); // cache at one
  })
});
