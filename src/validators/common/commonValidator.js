const Joi = require('joi');

const { constants } = require('../../constants/constants');

const commonValidator = {
  emailValidator: Joi.string().pattern(constants.emailRegexp).trim().required(),
  passwordValidator: Joi.string().alphanum().min(8).trim().required(),
};

module.exports = {
  commonValidator,
};
