const Joi = require('joi');

const { constants } = require('../../constants/constants');

const authValidator = {
  registration: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    age: Joi.number().integer().greater(1).less(100).required(),
    email: Joi.string().pattern(constants.EMAIL_REGEXP).trim().required(),
    password: Joi.string().min(8).max(15).trim().required(),
  }),
};

module.exports = {
  authValidator,
};
