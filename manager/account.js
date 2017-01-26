'use strict'
const resAccess = require('../resAccess/account');

module.exports = {

    getActiveMemberships: function (request) {
        return resAccess.getActiveMemberships(request.params);
    },

    getRelatedMemberships: function (request) {
        return resAccess.getRelatedMemberships(request.params, request.auth.session);
    },

    getPersonalInfo: function (request) {
        return resAccess.getPersonalInfo(request.params, request.auth.session);
    },

    getLinkedMembers: function (request) {
        return resAccess.getLinkedMembers(request.params, request.auth.session);
    },

    updatePersonalInfo: function (request) {
        return resAccess.updatePersonalInfo(request.params.accountId, request.payload,request.auth.session);
    },

};
