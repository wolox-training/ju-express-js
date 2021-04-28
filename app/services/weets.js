const { Weet } = require('../models');
const logger = require('../logger');
const errors = require('../errors');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../helpers/constants');

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

const getWeets = async (limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) => {
  try {
    logger.info(`weets-service::getWeets::limit::${limit}::offset::${offset}`);
    const response = await Weet.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'userId', 'content']
    });
    return response;
  } catch (error) {
    logger.error(`weets-service::getWeets::error::${error.message}`);
    throw errors.databaseError('Error trying to get weet data from the DB');
  }
};

module.exports = {
  createWeet,
  getWeets
};
