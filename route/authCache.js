'use strict';
const Manager = require('../manager/authCache');
const Joi = require('joi');
const Response = require('./response').setup(Manager);

module.exports = {

    getAuthToken: {
        validate: {
            params: {
                memberId: Joi.number(),
            },
        },
        handler: function (request, reply) {
            Response(request, reply, 'getAuthToken');
        },
    },

    login: {        
        handler: function (request, reply) {
            Response(request, reply, 'login');
        },
    },

};
