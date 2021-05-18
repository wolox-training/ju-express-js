const Joi = require('joi');
const utilities = require('../../helpers/utilities');

const ratingWeetCreatechema = Joi.object({
  score: Joi.number()
    .valid(-1, 1)
    .required()
})
  .required()
  .error(err =>
    err.map(error => {
      const messages = utilities.customErrorMessages(error);
      error.message = messages[error.code] || error.message;
      return error;
    })
  );

module.exports = {
  ratingWeetCreatechema
};
