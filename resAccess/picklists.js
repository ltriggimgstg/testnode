'use strict';

const sfApi = require('../utils/api/salesforceApi');
const dPL = require('../utils/sf/dependentPicklist');
const Picklist = require('../model/picklist');
//const redis = require('redis');
//const client = redis.createClient();
const client = require('redis').createClient(process.env.REDIS_URL);
let _gender = [];
let _country = [];
let _state = [];
let active = false;

//dummy promise
let connection = Promise.resolve();
const CACHE = 1000;
const ttl = {
    end: CACHE * 100,
    isValid: function () {
        return this.end > Date.now();
    },
    refresh: function () {
        this.end = Date.now() + CACHE * 100;
    }
};

function getAll () {
    if(active){
        return connection;
    }
    active = true;
    _gender = [];
    _country = [];
    _state = [];
    connection = new Promise(
        function (resolve, reject) {
            client.hget('cache', 'picklistsd', (err, result)=> {
                if (result !== null) {
                    //console.log('refreshing from redis')
                    const data = JSON.parse(result);
                    _gender = data.gender;
                    _country = data.country;
                    ttl.refresh();
                    active = false;
                    return resolve();
                } else {
                    new sfApi.SalesforceApi().getPicklists()
                        .then(data => {
                            //console.log('refreshing from salesforce')
                            _gender = data.body.fields.find(x=>x.label == 'Gender').picklistValues.filter(x=>x.active === true).map(x => Picklist.toModel(x));
                            _country = data.body.fields.find(x=>x.name === 'CountryOfBirth__c').picklistValues;
                            //tmp 
                            if(data.body.fields.find(x=>x.name === 'StateOfBirth__c')){
                                _state = data.body.fields.find(x=>x.name === 'StateOfBirth__c').picklistValues.filter(x=>x.active === true);
                                _state = dPL(_country, _state);
                                for(const code in _state){
                                    _state[code] = _state[code].map(x => Picklist.toModel(x));
                                }
                            }
                            _country = _country.filter(x=>x.active === true).map(x => Picklist.toModel(x));
                            
                            let picklist = {gender: _gender, country: _country, state: _state};
                            client.hset('cache', 'picklists', JSON.stringify(picklist));
                            client.expire('cache', CACHE);
                            ttl.refresh();
                            active = false;
                            return resolve();
                        })
                        .catch(err => reject(err));
                }
            });
        }
    );
    return connection;
}
    
function getGender(){
    return new Promise(
        function (resolve, reject) {
            if (_gender.length && ttl.isValid()) {
                return resolve(_gender);
            }
            getAll()
                .then(() => resolve(_gender))
                .catch(e => reject(e));
        }
    );
}
    
function getCountries(){
    return new Promise(
        function (resolve, reject) {
            if (_country.length && ttl.isValid()) {
                return resolve(_country);
            }
            getAll()
            .then(() => resolve(_country))
            .catch(e => reject(e));
        }
    );
}

function getStates(countryCode) {
    return new Promise(
        function (resolve, reject) {
            if (_state.length && ttl.isValid()) {
                return resolve(getState(countryCode));
            }
            getAll()
            .then(() => resolve(getState(countryCode)))
            .catch(e => reject(e));
        }
    );
}
function getState(countryCode){
    if(_state[countryCode]===undefined){
        return [];
    }
    return _state[countryCode];
}

module.exports = {
    getCountries,
    getGender,
    getStates
};