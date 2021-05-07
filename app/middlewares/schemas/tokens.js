const Joi = require('joi');
const utilities = require('../../helpers/utilities');

const invalidatedSessionsSchema = Joi.object({
  id: Joi.number()
    .required()
    .min(1)
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
  invalidatedSessionsSchema
};
