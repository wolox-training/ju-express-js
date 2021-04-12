const { User } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

const createUser = async userData => {
  try {
    logger.info(`users-service::create::userData::${JSON.stringify(userData)}`);
    const result = await User.create(userData);
    return result;
  } catch (error) {
    logger.error(error);
    logger.error(`users-service::create::error::${error}`);
    throw errors.databaseError('Error creating user into DB');
  }
};

const getUserByEmail = async email => {
  try {
    logger.info(`users-service::getUserByEmail::email::${email}`);
    const result = await User.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(error);
    logger.error(`users-service::getUserByEmail::error::${error}`);
    throw errors.databaseError('Error getting user by email into DB');
  }
};

module.exports = {
  createUser,
  getUserByEmail
};
