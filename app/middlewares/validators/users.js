const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const querySchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email()
    .regex(/^[a-zA-Z]+.[a-zA-Z]+@wolox.+((co)|(ar)|(mx))$/)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .required()
});

const validation = validator.body(querySchema);

module.exports = {
  validation
};
