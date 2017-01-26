'use strict'
const resAccess = require('../resAccess/authCache');

module.exports = {

    getAuthToken: function (request) {
        return resAccess.getAuthToken(request.params);
    },

    login: function () {
        return resAccess.login();
    },

};