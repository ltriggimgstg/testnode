'use strict';
const Manager = require('../manager/sfPersonalInfo');
const Joi = require('joi');
const Response = require('./response').setup(Manager);

module.exports = {

    getPersonalInfo: {
        validate: {
            params: {
                token: Joi.string(),
                memberId: Joi.number(),
            },
        },
        handler: function (request, reply) {
            Response(request, reply, 'getPersonalInfo');
        },
    },

};
