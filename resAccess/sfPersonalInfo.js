'use strict';

const db = require('../config/db');
const sql = require('../sql/sql').account;
const sfApi = require('../utils/api/salesforceApi');
const PersonalInfo = require('../model/personalInfo');

module.exports = {

    getPersonalInfo: function (payload, auth) {
        return new Promise(
            function (resolve, reject) {
                new sfApi.SalesforceApi(auth).getContact(payload.accountId)
                    .then(data => {
                        //console.log(data);
                        resolve(PersonalInfo.toModel(data.body))
                    })
                    .catch(e => reject(e));
            });
    },

};
