'use strict';
const Manager = require('../manager/account');
const Joi = require('joi');
const Response = require('./response').setup(Manager);
const PersonalInfo = require('../model/personalInfo.js').joiValidation;

module.exports = {

    getActiveMemberships: {
        validate: {
            params: {
                accountId: Joi.string(),
            },
        },
        handler: function (request, reply) {
            Response(request, reply, 'getActiveMemberships');
        },
    },

    getRelatedMemberships: {
        validate: {
            params: {
                organisationId: Joi.string(),
                accountId: Joi.string().guid(),
            },
        },
        handler: function (request, reply) {
            Response(request, reply, 'getRelatedMemberships');
        },
    },

    getPersonalInfo: {
        validate: {
            params: {
                accountId: Joi.string()
            },
        },
        handler: function (request, reply) {
            Response(request, reply, 'getPersonalInfo');
        },
    },

    getLinkedMembers: {
        validate: {
            params: {
                accountId: Joi.string()
            },
        },
        handler: function (request, reply) {
            Response(request, reply, 'getLinkedMembers');
        },
    },

    updatePersonalInfo: {
        validate: {
            params: {
                accountId: Joi.string()
            },
           // payload: PersonalInfo,
        },
        handler: function (request, reply) {
            Response(request, reply, 'updatePersonalInfo');
        },
    },

};
