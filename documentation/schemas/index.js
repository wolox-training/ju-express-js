const common = require('./common');
const user = require('./user');

module.exports = {
  ...common,
  ...user,
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
