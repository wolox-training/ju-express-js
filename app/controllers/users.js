const UserService = require('../services/users');
const logger = require('../logger/index');
const utilities = require('../helpers/utilities');
const errors = require('../errors');
const { signUpMapper } = require('../mappers/users');

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userData = signUpMapper(body);

    const userByEmail = await UserService.getUserByEmail(userData.email);

    if (userByEmail) {
      throw errors.defaultError('The user already exists');
    }

    body.password = await utilities.encryptText(userData.password);

    const result = await UserService.createUser(userData);

    logger.info(`User ${result.firstName} created succesfully`);

    return res.status(201).send({
      data: { name: userData.firstName }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  signUp
};
