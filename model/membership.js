'use strict'
const Joi = require('joi');
module.exports = Joi.object().keys({
    name: Joi.string().required(),	
    sport: Joi.string().uuid().required(),	
    memberId: Joi.string().uuid().required(),	
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.date().required(),
    parentMemberId: Joi.string().uuid().required(),	
});
    
    