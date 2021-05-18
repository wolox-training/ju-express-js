const moment = require('moment-timezone');
const { TIME_ZONE } = require('../app/helpers/constants');

moment.tz(TIME_ZONE);

module.exports = {
  moment
};
