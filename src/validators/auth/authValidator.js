const Joi = require('joi');

const { commonValidator } = require('../common/commonValidator');

const authValidator = {
  registration: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: commonValidator.emailValidator,
    password: commonValidator.passwordValidator,
  }),
  login: Joi.object().keys({
    email: commonValidator.emailValidator,
    password: commonValidator.passwordValidator,
  }),
};

module.exports = {
  authValidator,
};
