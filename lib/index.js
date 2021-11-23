const { before, after } = require('./hooks');
const setup = require('./setup');

module.exports = {
  cacheBefore: before,
  cacheAfter: after,
  cacheSetup: setup
};
