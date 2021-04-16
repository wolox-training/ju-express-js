const { userSchema } = require('../schemas/users');

const errors = require('../../errors');

const validator = (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      next(errors.badRequestError(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validator
};
