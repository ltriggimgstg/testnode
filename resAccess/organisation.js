'use strict';
const db = require('../config/db');
const sql = require('../sql/sql').organisation;

module.exports = {

    insertMembershipSubscription : function(payload) {
        return db.one(sql.insertMembershipSubscription, payload);
    },

    insertRegistrationForm : function(payload) {
        return db.one(sql.insertRegistrationForm, payload);
    },

};