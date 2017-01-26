'use strict';
const db = require('../config/db');
const sql = require('../sql/sql').membership;
const sfApi = require('../utils/api/salesforceApi');


module.exports = {

    getMemberPreferences : function(payload) {
        return db.one(sql.getMemberPreferences, payload);
//        .then(data => ); 
    },

    updateMemberPreferences : function(payload) {
        return db.any(sql.updateMemberPreferences, payload);
    },

    getMembershipHistory : function(payload) {
        return db.any(sql.getMembershipHistory, payload);
    },

    getTransactionsHistory : function(payload) {
        return db.any(sql.getTransactionsHistory, payload);
    },

    updateMemberCommsPref : function(payload) {
        return db.any(sql.updateMemberCommsPref, payload);
    },

    updateMemberPrivPref : function(payload) {
        return db.any(sql.updateMemberPrivPref, payload);
    },
    
    getMemberTypes : function(payload) {
        return db.any(sql.getMemberTypes, payload);
    },
    

};
