const userService = require('../services/users');

const createUserAdmin = async (userData) => {
    try {
      let result = null;

      if ( userData.id )
        result = await userService.updateUser(userData);
      else
        result = await userService.createUser(userData);

      return result;

    } catch (error) {
      logger.error(`userController::signUp::error::${error}`);
      return next(error);
    }
  };

  module.exports = {
    createUserAdmin
  };
  