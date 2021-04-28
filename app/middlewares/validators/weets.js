const { weetsGetAllSchema } = require('../schemas/weets');
const errors = require('../../errors');

const weetsGetAllValidator = (req, res, next) => {
  try {
    const { error } = weetsGetAllSchema.validate(req.query);
    if (error) {
      next(errors.badRequestError(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  weetsGetAllValidator
};
