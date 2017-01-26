'use strict';
const Manager = require('../manager/picklists');
const Joi = require('joi');
const Response = require('./response').setup(Manager);


module.exports = {

    getCountries: {
        handler: function (request, reply) {
            Response(request, reply, 'getCountries');
        },
    },
    getGender: {
        handler: function (request, reply) {
            Response(request, reply, 'getGender');
        },
    },
    getProvinces: {
        validate: {
            params: {
                countryCode: Joi.string(),
            },
        },
        handler: function (request, reply) {
            Response(request, reply, 'getStates');
        },
    },
};
