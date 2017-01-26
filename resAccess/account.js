'use strict';
const db = require('../config/db');
const sql = require('../sql/sql').account;
const sqlUtil = require('../sql/sql').utils;
const sfApi = require('../utils/api/salesforceApi');
const PersonalInfo = require('../model/personalInfo');
const LinkedMembers = require('../model/linkedMembers');
//const PickLists = require('./picklists');

module.exports = {

    getActiveMemberships : function(payload) {
        return db.many(sql.getActiveMemberships, payload).catch(data=>{
            //handle no data error
            if(data.code === 0){
                return('no data');
            }
            throw(data);
        });
    },

    getRelatedMemberships : function(payload, auth) {
        // orgId should be masked too
        return db.many(sqlUtil.getSalesforceId, payload.accountId)
        .then(data => new sfApi.SalesforceApi(auth).getLinkedMembers(data[0].salesforceId))
        .then(data =>{
            payload.accountId =`'`+[payload.accountId, payload.accountId, ...data.body.records].join(`','`)+`'`;
            return db.any(sql.getRelatedMemberships, payload);
        })
    },

    getPersonalInfo : function(payload, auth) {
        return db.many(sqlUtil.getSalesforceId, payload.accountId)
        .then(data => new sfApi.SalesforceApi(auth).getContact(data[0].salesforceId))
        .then(data => PersonalInfo.toModel(data.body))
    },
    
    getLinkedMembers : function(payload, auth) {
        return db.many(sqlUtil.getSalesforceId, payload.accountId)
        .then(data => new sfApi.SalesforceApi(auth).getLinkedMembers(data[0].salesforceId))
        .then(data =>{
            payload.accountId =`'`+[payload.accountId, payload.accountId, ...data.body.records].join(`','`)+`'`;
            return db.any(sql.getRelatedMemberships, payload);
        })
    },

    updatePersonalInfo : function(id,payload,auth) {
        //dummy Promise error
        //return db.one(sql.updatePersonalInfo, payload);
        return new Promise(
            function (resolve, reject){
                new sfApi.SalesforceApi(auth).updateContact(id,payload)
                    .then(data => {
                        resolve(PersonalInfo.toModel(data.body))
                    })
                    .catch(e => reject(e));
            }
        );
    },

};
