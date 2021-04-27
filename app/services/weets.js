const { Weet } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

const createWeet = async weetData => {
  try {
    logger.info(`weets-service::createWeet::weetData::${JSON.stringify(weetData)}`);
    const result = await Weet.create(weetData);
    return result;
  } catch (error) {
    logger.error(`weets-service::createWeet::error::${error.message}`);
    throw errors.databaseError('Error creating weet into DB');
  }
};

module.exports = {
  createWeet
};
