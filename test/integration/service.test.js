const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');
const memory = require('feathers-memory');
const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const { NotAuthenticated, BadRequest } =require('@feathersjs/errors')

const { cacheBefore, cacheAfter, cacheSetup  } = require('../../lib/index')

const assert = chai.assert;
chai.use(chaiAsPromised);
const app = express(feathers());
app.configure(express.rest());

// TODO - setup test

describe('service', () => {
  let user1;
  let user2;
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
          (ctx)=>{if(ctx.params.user && ctx.params.user.id === 4){throw new NotAuthenticated()}},
        ]
      },
      after: {
        all: [
          (ctx)=>{if(ctx.params.user && ctx.params.user.id === 5){throw new BadRequest()}},
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
    let result1 = await app.service('users').get(user2.id);
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1) // cache at one
    let result2 = await app.service('users').update(user2.id,{...user2,new:true});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 0) // cache back to zero
    let result3 = await app.service('users').get(user2.id);
    assert.isUndefined(result1.new); // no modified yet
    assert.isOk(result2.new); // modification went through
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1) // cache back to one
    
  });

  it('denies cache with different auth', async () => {
    let result1 = await app.service('users').find({query:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    let result2 = await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 2);
    let result3 = await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCDE'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 3);
    let result4 = await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user1.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 4);
  })
  it('allows cache with same auth', async () => {
    let result1 = await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    let result2 = await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:user2.id}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1);
  })

  it('disallows cache of error with unauthed', async () => {
    try {
      let result1 = await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:4}});
    }catch(e){
      assert.strictEqual(e.className, 'not-authenticated')
    }
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 0); // cache at one
  })

  it('disallows cache of after hook error', async () => {
    try {
      let result1 = await app.service('users').find({query:{id:user2.id}, authenticated:true, authentication:{strategy:'jwt', accessToken:'ABCD'}, user:{id:5}});
    }catch(e){
      assert.strictEqual(e.className, 'bad-request')
    }
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 0); // cache at one
  })


  it('allows caching of different pages', async () => {
    let result1 = await app.service('users').find({query:{$limit:1,$skip:0}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    let result2 = await app.service('users').find({query:{$limit:1,$skip:0}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    let result3 = await app.service('users').find({query:{$limit:1,$skip:2}});
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 2); // cache at one
  });

  it('allows same caching of default limit vs enforced', async () => {
    let result1 = await app.service('users').find();
    assert.strictEqual(app.get('cache_Global').cache.itemCount, 1); // cache at one
    let result2 = await app.service('users').find({query:{$skip:1}});
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
            key:(ctx)=>{ return ctx.method}
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
    let result1 = await app.service('birds').find();
    assert.strictEqual(app.get('cache_birds').cache.itemCount, 1); // cache at one
    let result2 = await app.service('birds').find({query:{id:1}});
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
            customHash:(ctx)=>{ 
              return Math.round(Math.random()*1000)
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
    let result1 = await app.service('gators').find();
    assert.strictEqual(app.get('cache_gators').cache.itemCount, 1); // cache at one    
    let result2 = await app.service('gators').find();
    assert.strictEqual(app.get('cache_gators').cache.itemCount, 2); // cache at one
  })
});
