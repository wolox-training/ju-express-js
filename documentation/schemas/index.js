const common = require('./common');
const user = require('./user');
const weet = require('./weet');
const ratingWeet = require('./ratingWeet');

module.exports = {
  ...common,
  ...user,
  ...weet,
  ...ratingWeet,

  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      },
      internal_code: {
        type: 'string'
      }
    }
  }
};
