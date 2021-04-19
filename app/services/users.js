const { User } = require('../models');
const logger = require('../logger');
const errors = require('../errors');
const { userObjectSerializer } = require('../serializers/users');

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

const getUsers = async (page, limit) => {
  try {
    let offset = 0;
    offset += (page - 1) * limit;
    const users = await User.findAll({ offset, limit });

    const response = await users.map(user => userObjectSerializer(user));
    return response;
  } catch (error) {
    logger.error(error);
    throw errors.databaseError('Error trying to get user data from the DB');
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUsers
};
