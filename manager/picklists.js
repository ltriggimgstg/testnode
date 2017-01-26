'use strict';
const resAccess = require('../resAccess/picklists');

module.exports = {

    getCountries: function () {
        return resAccess.getCountries();
    },
    getGender: function () {
        return resAccess.getGender();
    },
    getStates: function (request) {
        return resAccess.getStates(request.params.countryCode);
    },
};