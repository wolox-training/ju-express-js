const { userSignUpSchema, userSignInSchema, usersGetAllSchema } = require('../schemas/users');
const utilities = require('../../helpers/utilities');
const errors = require('../../errors');

const signUpValidator = (req, res, next) => {
  try {
    const { error } = userSignUpSchema.validate(req.body);
    if (error) {
      next(errors.badRequestError(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

const signInValidator = (req, res, next) => {
  try {
    const { error } = userSignInSchema.validate(req.body);
    if (error) {
      next(errors.badRequestError(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(errors.unauthorizedError('Missing token'));
    }

    req.token = utilities.verifyToken(token);
    return next();
  } catch (error) {
    return next(errors.unauthorizedError('Invalid token'));
  }
};

const usersGetAllValidator = (req, res, next) => {
  try {
    const { error } = usersGetAllSchema.validate(req.query);
    if (error) {
      next(errors.badRequestError(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpValidator,
  signInValidator,
  validateToken,
  usersGetAllValidator
};
