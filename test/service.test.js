const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');
const memory = require('feathers-memory');
const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');

const { cacheBefore, cacheAfter, cacheSetup  } = require('../lib/index')

const assert = chai.assert;
chai.use(chaiAsPromised);
const appTest = express(feathers());
appTest.configure(express.rest());
appTest.configure(cacheSetup())

describe('service', () => {
  console.log('before1')
  console.log(appTest.get('cache_Global'))
  let user
  before(async ()=>{
    console.log('before2')
    appTest.use('/users', memory({
      paginate: {
        default: 10,
        max: 50
      }
    }));

    appTest.service('users').hooks({
      before: {
        all: [
          cacheBefore()
        ]
      },
      after: {
        all: [
          cacheAfter()
        ]
      }
    });
    await appTest.setup();

    user = await appTest.service('users').create({
      username: 'David',
      password: 'password'
    })
    // done()
  })

  // it('returns same value when requesting twice empty', async () => {
  //   let query = {
  //     username: 'steve',
  //     $limit: 10
  //   };
  //   // console.log(await appTest.service('users'))
  //   let result = await appTest.service('users').find({ query });
  //   let result2 = await appTest.service('users').find({ query });
  //   assert.strictEqual(result2.fromCache, true);
  //   assert.deepEqual(result.data, result2.data);
  //   assert.ok(true)
  // });

  //   it('returns same value when requesting twice', async () => {
  //     let query = {
  //       username:'David',
  //       $limit:10
  //     };
  //     let result = await appTest.service('users').find({query});
  //     let result2 = await appTest.service('users').find({query});
  //     assert.strictEqual(result2.fromCache, true);
  //     assert.deepEqual(result.data, result2.data);
  //   });
    // it('invalidates cache after update', async () => {
    //   let query = {
    //     username:'David',
    //     $limit:10
    //   };
    //   let result = await appTest.service('users').update(user.id,{...user,new:true});
    //   let result2 = await appTest.service('users').find({query});
    //   assert.isUndefined(result2.fromCache);
    //   assert.deepEqual(result, result2.data[0]);
    // });

  it('denies cache with different auth', async () => {

    
  })
  // it('allows cache with same auth', async () => {})

  //   it('uses different cache with different context', async () => {})
  //   it('uses different context when set', async () => {})
  //   it('uses different key with ID', async () => {})
  //   it('uses different key without ID', async () => {})
  //   it('uses different key with ID and query', async () => {})
  //   it('uses different key without ID and query', async () => {})
  //   it('uses global context when setup', async () => {})

  //     it('fails for protected service and external call when not strategy', async () => {
  //       try {
  //         await appTest.service('protected').get('test', {
  //           provider: 'rest',
  //           authentication: {
  //             username: 'David',
  //             password: 'password'
  //           }
  //         });
  //         assert.fail('Should never get here');
  //       } catch (error) {
  //         assert.strictEqual(error.name, 'NotAuthenticated');
  //         assert.strictEqual(error.message, 'Invalid authentication information (no `strategy` set)');
  //       }
  //     });

  //     it('fails when entity service was not found', async () => {
  //       delete app.services.users;

  //       await assert.isRejected(appTest.service('protected').get('test', {
  //         provider: 'rest',
  //         authentication: {
  //           strategy: 'basic',
  //           accessToken: userToken
  //         }
  //       }), {
  //         message: 'Can not find service \'users\''
  //       });
  //     });

  //     it('fails when accessToken is not set', async () => {
  //       try {
  //         await appTest.service('protected').get('test', {
  //           provider: 'rest',
  //           authentication: {
  //             strategy: 'basic'
  //           }
  //         });
  //         assert.fail('Should never get here');
  //       } catch (error) {
  //         assert.strictEqual(error.name, 'NotAuthenticated');
  //         assert.strictEqual(error.message, 'No access token');
  //       }
  //     });

  //     it('passes when authentication is set and merges params', async () => {
  //       const params = {
  //         provider: 'rest',
  //         authentication: {
  //           strategy: 'basic',
  //           accessToken: userToken
  //         }
  //       };

  //       const result = await appTest.service('protected').get('test', params);

  //       assert.strictEqual(Object.keys(result.params).length, 4);
  //       assert.ok(!result.params.accessToken, 'Did not merge accessToken');
  //       assert.deepStrictEqual(result, {
  //         id: 'test',
  //         params: merge({}, params, {
  //           user,
  //           authentication: {
  //             strategy: 'basic',
  //             accessToken: userToken
  //           },
  //           authenticated: true
  //         })
  //       });
  //     });
  //   });

  //   describe('parse', () => {
  //     const res = {};

  //     it('returns null when header not set', async () => {
  //       const req = {};

  //       const result = await appTest.service('authentication').parse(req, res, 'basic');

  //       assert.strictEqual(result, null);
  //     });

  //     it('return null when scheme does not match', async () => {
  //       const req = {
  //         headers: {
  //           authorization: ' jwt something'
  //         }
  //       };

  //       const result = await appTest.service('authentication').parse(req, res, 'basic');

  //       assert.strictEqual(result, null);
  //     });
  // });
});
