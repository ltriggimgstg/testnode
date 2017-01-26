'use strict';
const Manager = require('../manager/organisation');
const Joi = require('joi');
const Response = require('./response').setup(Manager);
const Subscription = require('../model/subscription.js');

module.exports = {

    insertMembershipSubscription:{
        validate: {
            params: {
                organisationId: Joi.string().guid(),
            }, payload: Subscription,
        },
        handler: function (request, reply) {
            Response(request, reply,'insertMembershipSubscription');
        },
    },

    insertRegistrationForm:{
        validate: {
            params: {
                organisationId: Joi.string().guid(),
            }, 
        },
        handler: function (request, reply) {
            Response(request, reply,'insertRegistrationForm');
        },
    },

};
