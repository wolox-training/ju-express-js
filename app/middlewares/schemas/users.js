const Joi = require('joi');
const utilities = require('../../helpers/utilities');

const userSignUpSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email()
    .regex(/^[a-zA-Z]+.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$/)
    .required()
    .messages({
      'string.pattern.base': 'email must be Wolox domain'
    }),
  password: Joi.string()
    .alphanum()
    .min(8)
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

const userSignInSchema = Joi.object({
  email: Joi.string()
    .email()
    .regex(/^[a-zA-Z]+.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$/)
    .required()
    .messages({
      'string.pattern.base': 'email must be Wolox domain'
    }),
  password: Joi.string()
    .alphanum()
    .min(8)
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

const usersGetAllSchema = Joi.object({
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
  userSignUpSchema,
  userSignInSchema,
  usersGetAllSchema
};
