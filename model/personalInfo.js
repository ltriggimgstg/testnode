'use strict';
const Joi = require('joi');
const Address = require('./address');

const joiValidation = Joi.object().keys({
    accountId: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    shippingAddress: Joi.object().keys({street: Joi.string(), suburb: Joi.string(), state: Joi.string(), postalCode: Joi.string(), country: Joi.string(), long: Joi, lat: Joi, geoCodeAcc: Joi, }),
    billingAddress: Joi.object().keys({street: Joi.string(), suburb: Joi.string(), state: Joi.string(), postalCode: Joi.string(), country: Joi.string(), long: Joi, lat: Joi, geoCodeAcc: Joi, }),
    photoURL: Joi.string(),
    phone: Joi.string(),
});

const toModel = function(data){
    const o = {};
    ({
        Id: o.AccountId,
        PhotoUrl: o.PhotoURL, 
        Phone: o.Phone,
        FirstName: o.FirstName,
        LastName: o.LastName,
        Birthdate: o.Birthdate,
        Email: o.Email
    } = data);
    const types = ['Mailing'];//, 'Shipping'];
    for(let name of types){
        o[name + 'Address'] = Address.toModel(name, data);
    }
    return o;
};

module.exports = {
    joiValidation,
    toModel
};