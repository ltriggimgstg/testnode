'use strict';
const Manager = require('../manager/membership');
const Joi = require('joi');
const Response = require('./response').setup(Manager);

module.exports = {

    getMemberPreferences:{
        validate: {
            params: {
                membershipId: Joi.string().guid(),
            }, 
        },
        handler: function (request, reply) {
            Response(request, reply,'getMemberPreferences');
        },
    },

    updateMemberPreferences:{
        validate: {
            params: {
                membershipId: Joi.string().guid(),
            }, 
        },
        handler: function (request, reply) {
            Response(request, reply,'updateMemberPreferences');
        },
    },

    getMembershipHistory:{
        validate: {
            params: {
                membershipId: Joi.string().guid(),
            }, 
        },
        handler: function (request, reply) {
            Response(request, reply,'getMembershipHistory');
        },
    },

    getTransactionsHistory:{
        validate: {
            params: {
                membershipId: Joi.string().guid(),
            }, 
        },
        handler: function (request, reply) {
            Response(request, reply,'getTransactionsHistory');
        },
    },

    updateMemberCommsPref:{
        validate: {
            params: {
                membershipId: Joi.string().guid(),
            },
        },
        handler: function (request, reply) {
            Response(request, reply,'updateMemberCommsPref');
        },
    },

    updateMemberPrivPref:{
        validate: {
            params: {
                membershipId: Joi.string().guid(),
            },
        },
        handler: function (request, reply) {
            Response(request, reply,'updateMemberPrivPref');
        },
    },
    
    getMemberTypes:{
        handler: function (request, reply) {
            Response(request, reply,'getMemberTypes');
        },
    },

};
