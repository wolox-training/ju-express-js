const { Token } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

const createToken = async (userData, token) => {
  try {
    logger.info(`tokens-service::createToken::userData::${JSON.stringify(userData)}token::${token}`);
    const { id: userId } = userData;
    const result = await Token.create({ userId, token });
    return result;
  } catch (error) {
    logger.error(`tokens-service::createToken::error::${error.message}`);
    throw errors.databaseError('Error creating tokens into DB');
  }
};

const invalidateTokens = async userId => {
  try {
    logger.info(`tokens-service::invalidateTokens::id::${userId}`);
    const result = await Token.destroy({ where: { userId } });
    return result;
  } catch (error) {
    logger.error(`tokens-service::invalidateTokens::error::${error.message}`);
    throw errors.databaseError('Error deleting tokens from DB');
  }
};

const getTokenByUserAndToken = async (userId, token) => {
  try {
    logger.info(`tokens-service::getTokenByUserAndToken::token::${token}`);
    const result = await Token.findOne({ where: { userId, token } });
    return result;
  } catch (error) {
    logger.error(`tokens-service::getTokenByUserAndToken::error::${error.message}`);
    throw errors.databaseError('Error getting tokens from DB');
  }
};

module.exports = {
  createToken,
  invalidateTokens,
  getTokenByUserAndToken
};
