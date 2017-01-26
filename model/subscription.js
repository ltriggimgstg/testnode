'use strict'
const Joi = require('joi');
module.exports = Joi.object().keys({

    organisationId: Joi.string().guid().required(),
    contactId: Joi.string().guid().required(),
    parentId: Joi.string().guid(),
    financialDate: Joi.date(),
    startDate: Joi.date().iso(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    dob: Joi.date(),
    contactNumbers: Joi.object().keys({mobile: Joi.string(), home: Joi.string(), }),
    email: Joi.string().email(),
    membershipType: Joi.string(),
    membershipRole: Joi.string(),
    paymentTxNo: Joi.string(),
});