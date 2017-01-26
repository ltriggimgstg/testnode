'use strict'
const Joi = require('joi');
module.exports = Joi.object().keys({
  organisationId: Joi.string().uuid().required(),
  membershipId: Joi.string().uuid().required(),
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.date().required(),
    emails: Joi.array(),
    mailingAddr: Joi.object(),
    receiveMktg: Joi.boolean(),
    recieveClubAnnc: Joi.boolean(),
    contactByPhone: Joi.boolean(),
    photoURL: Joi.string(),
    parentMemberId: Joi.string().uuid().required(),
});
