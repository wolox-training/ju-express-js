const axios = require('axios');
const logger = require('../logger');
const config = require('../../config');
const errors = require('../errors');

const getRandomQuote = async () => {
  try {
    logger.info('quotes_garden::getRandomQuote');
    const result = await axios.get(config.common.quoteGardenEndpointsApi.getRandomQuote);
    const { data } = result;
    logger.info(`quotes_garden::getRandomQuote::data::${data}`);
    return { data };
  } catch (error) {
    logger.error(`quotes_garden::getRandomQuote::error::${error}`);
    throw errors.apiError('Error getting data from api');
  }
};

module.exports = {
  getRandomQuote
};
