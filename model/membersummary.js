'use strict'
const Joi = require('joi');
module.exports = Joi.object().keys({
    name: Joi.string().required(),
    memberId: Joi.string().uuid().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});
