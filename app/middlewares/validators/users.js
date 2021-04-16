const Joi = require('joi');

const errors = require('../../errors');

const customErrorMessages = error => ({
  'any.required': `field '${error.path[0]}' is required`,
  'string.base': `field '${error.path[0]}' must be a string'`
});

const userSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email()
    .regex(/^[a-zA-Z]+.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$/)
    .required()
    .messages({
      'string.pattern.base': 'email must be a Wolox domain'
    }),
  password: Joi.string()
    .alphanum()
    .min(8)
    .required()
})
  .required()
  .error(err =>
    err.map(error => {
      const messages = customErrorMessages(error);
      error.message = messages[error.code] || error.message;
      return error;
    })
  );

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
