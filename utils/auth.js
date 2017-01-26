'use strict';

/** largly stolen from hapi-auth-bearer-token */
const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const Iron = require('iron');
const Db = require('../config/db');
const Sql = require('../sql/sql').utils;
const sf= require('./api/salesforceApi');

//const redis = require('redis');
//const client = redis.createClient();
const client =  require('redis').createClient(process.env.REDIS_URL);
const password = process.env.IRON_KEY || 'some_not_random_password_that_is_at_least_32_characters';

function genUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const internals = {};

internals.defaults = {
    accessTokenName: 'access_token',
    allowQueryToken: true,
    allowCookieToken: false,
    allowMultipleHeaders: false,
    allowChaining: false,
    tokenType: 'Bearer'
};

internals.schema = Joi.object().keys({
    accessTokenName: Joi.string().required(),
    allowQueryToken: Joi.boolean(),
    allowCookieToken: Joi.boolean(),
    allowMultipleHeaders: Joi.boolean(),
    allowChaining: Joi.boolean(),
    tokenType: Joi.string().required()
});

internals.implementation = (server, options) => {

    Hoek.assert(options, 'Missing bearer auth strategy options');
    const settings = Hoek.applyToDefaults(internals.defaults, options);
    Joi.assert(settings, internals.schema);
    const scheme = {
        authenticate: (request, reply) => {
            let authorization = request.raw.req.headers[settings.accessTokenName];
            if (settings.allowCookieToken
                && !authorization
                && request.state[settings.accessTokenName] ) {
                authorization = request.state[settings.accessTokenName];
            }
            if (settings.allowQueryToken
                && !authorization
                && request.query[settings.accessTokenName] ) {
                authorization = request.query[settings.accessTokenName];
                delete request.query[settings.accessTokenName];
            }
            if (!authorization) {
                return reply(Boom.unauthorized(null, settings.tokenType));
            }
            const token = authorization;
            // unwrap token
            Iron.unseal(token, password, Iron.defaults, (err, unsealed) => {
                if(err){
                    const message = (settings.allowChaining && request.route.settings.auth.strategies.length > 1) ? null : 'Auth Error';
                    return reply(Boom.unauthorized(message, settings.tokenType));
                }
               //FOR DEV PURPOSES
                if(process.env.NODE_ENV ==='development'){
                   request.auth.session = JSON.parse(process.env.OAUTH_TOKEN.replace(/\'/g,'"'));
                   return reply.continue( { credentials:'ok',  artifact1: 'an artifact' });
                }
               // get session from redis
                client.hget(unsealed,'auth',  (err, credentials)=>  {
                    if(err){
                        const message = (settings.allowChaining && request.route.settings.auth.strategies.length > 1) ? null : 'Bad token';
                        return reply(Boom.unauthorized(message, settings.tokenType));
                     }
                     if(reply === null){
                         const message = (settings.allowChaining && request.route.settings.auth.strategies.length > 1) ? null : 'Bad token';
                         return reply(Boom.unauthorized(message, settings.tokenType));
                     
                     }else{
                         request.auth.session = JSON.parse(credentials);
                         return reply.continue( { credentials:'ok',  artifact1: 'an artifact' });
                     }
                 });
             });
        }
    };
    return scheme;
}; 

const login = function (request){
    return new Promise(function(resolve, reject) {
        if (!request.auth.isAuthenticated) {
            return reject('Authentication failed due to: ' + request.auth.error.message);
        }else{
            new sf.SalesforceApi(request.auth.credentials).getContact(request.auth.credentials.profile.raw.custom_attributes.contactId)
            .then((data)=> {
                // get herokuId
                request.auth.credentials.contact= data.body;
                return Db.any(Sql.getMemberId, data.body.AccountId);})
            // get contactid
            .then(data => {
                request.auth.credentials.member = data[0];
                // save session in redis
                const key = genUUID();
                client.hset(key, 'auth', JSON.stringify(request.auth.credentials) );// or hset
                // wrap token
                Iron.seal(key, password, Iron.defaults, (err, sealed) => 
                    {
                        if(err){
                            return reject('err');
                        }
                        return resolve(sealed);
                    }
                );
            })
            .catch(error => reject(error));  
        }
    })
};

exports.register = (server, options, next) => {
    server.auth.scheme('bearer-access-token', internals.implementation);
    server.expose('login', login);
    next();
};

exports.register.attributes = {
    name: 'auth',
    version: '0.1.0',
    multiple: false
};