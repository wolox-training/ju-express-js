const UserService = require('../services/users');
const logger = require('../logger/index');
const utilities = require('../helpers/utilities');

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const payload = body;

    body.password = await utilities.encryptText(payload.password);

    const result = await UserService.createUser(body);

    logger.info(`User ${result.firstName} created succesfully`);

    return res.status(201).send(result);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  signUp
};
