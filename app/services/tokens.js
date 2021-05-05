const { Token } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

const createToken = async tokenData => {
  try {
    logger.info(`tokens-service::createToken::tokenData::${JSON.stringify(tokenData)}`);
    const result = await Token.create(tokenData);
    return result;
  } catch (error) {
    logger.error(`tokens-service::createToken::error::${error.message}`);
    throw errors.databaseError('Error creating tokens into DB');
  }
};

module.exports = {
  createToken
};
