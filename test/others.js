'use strict';

const Params = require('../test/config/params');

const Login = [
    '/',
    '/Login'
]
const SFPersonalInfo=[
    '/',
    '/SFPersonalInfo/{token}/Member/{memberId}/GetPersonalInfo',
    '/SFPersonalInfo/' + Params.token + '/Member/{memberId}/GetPersonalInfo',
    '/SFPersonalInfo/{token}/Member/' + Params.memberId + '/GetPersonalInfo',
    '/SFPersonalInfo/' + Params.token + '/Member/' + Params.memberId + '/GetPersonalInfo',

]


let options = { 
    method: 'GET',
    url: ''

};
module.exports =[
    function (test,server){
        test('Others -> Login', function (t) {
            t.plan(2);
            options.url = Login[0];
            server.inject(options, function (response) {
                t.equal(response.statusCode, 404);
            });
            options.url = Login[1];
            server.inject(options, function (response) {
                t.equal(response.statusCode, 200);
            });
        })
}];

module.exports =[
    function (test,server){
        test('SFPersonalInfo -> GetPersonalInfo', function (t) {
            t.plan(5);
            options.url=SFPersonalInfo[0];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 404);
            });
            options.url=SFPersonalInfo[1];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 400);
            });
            options.url=SFPersonalInfo[2];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 400);
            });
            options.url=SFPersonalInfo[3];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 400);
            });
            options.url=SFPersonalInfo[4];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 200);
            });
        });
    },
    
];