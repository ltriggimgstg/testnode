'use strict';
const Params = require('../test/config/params');

const AuthCache = [
    '/',
    '/AuthCache/{memberId}/GetAuthToken',
    '/AuthCache/' + Params.memberId + '/GetAuthToken',

]


let options = {
    method: 'GET',
    url: ''
};

module.exports = [
    function (test, server) {
        test('AuthCache -> GetAuthToken', function (t) {
            t.plan(3);
            options.url = AuthCache[0];
            server.inject(options, function (response) {
                t.equal(response.statusCode, 404);
            });
            options.url = AuthCache[1];
            server.inject(options, function (response) {
                t.equal(response.statusCode, 400);
            });
            options.url = AuthCache[2];
            server.inject(options, function (response) {
                t.equal(response.statusCode, 200);
            });
        });
    },

];