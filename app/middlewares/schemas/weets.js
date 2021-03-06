const Joi = require('joi');
const utilities = require('../../helpers/utilities');

const weetsGetAllSchema = Joi.object({
  limit: Joi.number()
    .required()
    .min(1)
    .max(50)
    .default(20),
  offset: Joi.number()
    .required()
    .min(0)
    .default(0)
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
  weetsGetAllSchema
};
