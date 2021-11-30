# Introduction

This module creates a cache is shared within the feathers instance as a global state.  For multi-instance, multi-container caching, use feathers-redis-cache instead.  With this cache, scaling your app to 4 containers will produce 4 independent caches.

By default, the cache's scope is global but can be setup on a per-service basis or even more granular.

## Quick Start

To cache the `/books` service, simply add the following hooks

```javascript

// src/services/books/books.hooks.js
const { cacheBefore, cacheAfter } = require('feathers-memory-cache');

module.exports = {
  before: {
    all: [
        cacheBefore()
    ],
    //...
  },

  after: {
    all: [
        cacheAfter()
    ],
    //...
  },

```



## Advanced usage

To cache the `/books` service with authentication, make sure the cacheBefore is _after_ the authentication check.  For example:

```javascript

 before: {
    all: [
      authenticate('basic'),
      cacheBefore(),      
    ],
    //...
 }

```

To modify the TTL or the max cache size:

```javascript

 before: {
    all: [
      cacheBefore({
        max:10,  // Cache will max hold 10 elements
        maxAge: 300000 // TTL set to 5min in milliseconds
      }),      
    ],
    //...
 }

```

To apply different cache configurations to different routes, add a `scope` parameter:

```javascript

// /books/books.hooks.js
    before: {
        all: [
        cacheBefore({
            scope:'books'
            max:10,  // Cache will max hold 10 elements
            maxAge: 300000 // TTL set to 5min in milliseconds
        }),      
        ],
        //...
    },
    after: {
        all: [cacheAfter({scope:'books'})]
    }

// /librarians/librarians.hooks.js
    before: {
        all: [
        cacheBefore({
            scope:'other-scope-for-librarians'
            max:5,  // Cache will max hold 5 elements
            maxAge: 1000 // TTL set to 1 second
        }),      
        ],
        //...
    },
    after: {
        all: [cacheAfter({scope:'other-scope-for-librarians'})]
    }

```

You can also use two caches in the same service, you can do the following.  Make sure to close out BOTH scopes in the after hook

```javascript

// /books/books.hooks.js
    before: {
        all: [
        iffElse(
            isAuthed(),[
                cacheBefore({
                    scope:'auth-cache'
                    max:10,  // Cache will max hold 10 elements
                    maxAge: 300000 // TTL set to 5min in milliseconds
                }), 
            ],[
                cacheBefore({
                    scope:'auth-no-cache'
                    max:100,  // Cache will max hold 10 elements
                    maxAge: 1000 // TTL set to 5min in milliseconds
                }), 
            ])
        ],
        //...
    },
    after: {
        all: [
            iffElse(isAuthed(),[cacheAfter({scope:'auth-cache'})],[cacheAfter({scope:'auth-no-cache'})])
        ],
        //...
    },

```



To set a custom hash to the cache key for your scoped cache:

```javascript
    // /books/books.hooks.js
    before: {
        all: [
            cacheBefore({
                customHash:(ctx)=>`${Math.floor(Math.random*1000)}`
            }),      
        ],
        //...
    }

```

To set a custom keying function:

```javascript
    // /books/books.hooks.js
    before: {
        all: [
            cacheBefore({
                key:(ctx)=>ctx.method+ctx.path+ctx.id
            }),      
        ],
        //...
    }
```

NOTE: if you override `key` or `customHash` it will override _all_ of the services using that cache, even if the scope is _unspecified_ and thus, global.
