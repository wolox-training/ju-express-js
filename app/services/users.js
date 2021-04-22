const { User } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../helpers/constants');

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
    logger.error(`users-service::getUserByEmail::error::${error}`);
    throw errors.databaseError('Error getting user by email into DB');
  }
};

const getUsers = async (limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) => {
  try {
    logger.info(`usersController::getUsers::limit::${limit}::offset::${offset}`);
    const response = await User.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'firstName', 'lastName', 'email']
    });
    return response;
  } catch (error) {
    logger.error(`users-service::getUsers::error::${error}`);
    throw errors.databaseError('Error trying to get user data from the DB');
  }
};

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

const updateUser = async userData => {
  try {
    logger.info(`users-service::create::userData::${JSON.stringify(userData)}`);
    const result = await User.update(userData);
    return result;
  } catch (error) {
    logger.error(error);
    logger.error(`users-service::create::error::${error}`);
    throw errors.databaseError('Error creating user into DB');
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  updateUser
};
