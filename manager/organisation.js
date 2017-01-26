'use strict'
const resAccess = require('../resAccess/organisation');

module.exports = {

    insertMembershipSubscription: function (request) {
        return resAccess.insertMembershipSubscription(request.payload);
    },

    insertRegistrationForm: function (request) {
        return resAccess.insertRegistrationForm(request.payload);
    },

};
