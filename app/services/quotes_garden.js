const axios = require('axios');
const logger = require('../logger');
const config = require('../../config');
const errors = require('../errors');
const { DEFAULT_LENGTH_WEET } = require('../helpers/constants');

const getRandomQuote = async () => {
  try {
    logger.info('quotes_garden-service::getRandomQuote');
    let quoteText = null;
    while (quoteText === null || quoteText.lenght > DEFAULT_LENGTH_WEET) {
      const result = await axios.get(config.common.quoteGardenEndpointsApi.getRandomQuote);
      const {
        data: {
          data: [payload]
        }
      } = result;

      ({ quoteText } = payload);
    }

    return quoteText;
  } catch (error) {
    logger.error(`quotes_garden-service::getRandomQuote::error::${error.message}`);
    throw errors.apiError('Error getting data from api');
  }
};

module.exports = {
  getRandomQuote
};
