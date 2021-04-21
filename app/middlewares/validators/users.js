const { userSignUpSchema, userSignInSchema } = require('../schemas/users');

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

module.exports = {
  signUpValidator,
  signInValidator
};
