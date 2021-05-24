const { invalidatedSessionsSchema } = require('../schemas/tokens');
const errors = require('../../errors');

const invalidateSessionsValidator = (req, res, next) => {
  try {
    const { error } = invalidatedSessionsSchema.validate(req.body);
    if (error) {
      next(errors.badRequestError(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  invalidateSessionsValidator
};
