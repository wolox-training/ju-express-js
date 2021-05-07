const { userSignUpSchema, userSignInSchema, usersGetAllSchema } = require('../schemas/users');
const utilities = require('../../helpers/utilities');
const errors = require('../../errors');
const tokenService = require('../../services/tokens');

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

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const tokenToVerify = token.split(' ')[1];

    if (!tokenToVerify) {
      return next(errors.unauthorizedError('Missing token'));
    }

    const tokenVeryfied = utilities.verifyToken(tokenToVerify);
    req.token = tokenVeryfied;
    const { id } = tokenVeryfied;
    const isTokenValid = await tokenService.getTokenByUserAndToken(id, tokenToVerify);

    if (!isTokenValid) {
      return next(errors.unauthorizedError('Invalid token does not exists'));
    }

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
