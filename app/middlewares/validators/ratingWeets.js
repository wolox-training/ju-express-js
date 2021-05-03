const { ratingWeetCreatechema } = require('../schemas/ratingWeets');
const errors = require('../../errors');

const ratingWeetCreateValidator = (req, res, next) => {
  try {
    const { error } = ratingWeetCreatechema.validate(req.body);
    if (error) {
      next(errors.badRequestError(error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ratingWeetCreateValidator
};
