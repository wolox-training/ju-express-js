const common = require('./common');
const user = require('./user');
const weet = require('./weet');

module.exports = {
  ...common,
  ...user,
  ...weet,
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
