'use strict'
const resAccess = require('../resAccess/sfPersonalInfo');

module.exports = {

    getPersonalInfo: function (request) {
        return resAccess.getPersonalInfo(request.params,request.auth.session);
    },

};