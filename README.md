# Placeholder for later

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
 }

```
