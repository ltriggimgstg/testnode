'use strict'
const resAccess = require('../resAccess/membership');

module.exports = {

    getMemberPreferences: function (request) {
        return resAccess.getMemberPreferences(request.params);
    },

    updateMemberPreferences: function (request) {
        return resAccess.updateMemberPreferences(request.payload);
    },

    getMembershipHistory: function (request) {
        return resAccess.getMembershipHistory(request.params);
    },

    getTransactionsHistory: function (request) {
        return resAccess.getTransactionsHistory(request.params);
    },

    updateMemberCommsPref: function (request) {
        return resAccess.updateMemberCommsPref(request.payload);
    },

    updateMemberPrivPref: function (request) {
        return resAccess.updateMemberPrivPref(request.payload);
    },
    
    getMemberTypes: function (request) {
        return resAccess.getMemberTypes(request.params);
    },

};
