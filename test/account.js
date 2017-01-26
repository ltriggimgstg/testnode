'use strict';

const Params = require('../test/config/params');

const Memberships=[
    '/',
    '/Account/{accountId}/Memberships',
    '/Account/' + Params.accountId + '/Memberships',

]
const RelatedMemberships=[
    '/',
    '/Account/{accountId}/Organisation/{organisationId}/RelatedMemberships',
    '/Account/' + Params.accountId + '/Organisation/{organisationId}/RelatedMemberships',
    '/Account/{accountId}/Organisation/' + Params.organisationId + '/RelatedMemberships',
    '/Account/' + Params.accountId + '/Organisation/' + Params.organisationId + '/RelatedMemberships',
]

let options = { 
    method: 'GET',
    url: ''
};

module.exports =[
    function (test,server){
        test('Account -> Memberships', function (t) {
            t.plan(3);
            options.url=Memberships[0];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 404);
            });
            options.url=Memberships[1];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 400);
            });
            options.url=Memberships[2];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 200);
            });

        });
    },
    function (test,server){
        test('Account -> RelatedMemberships', function (t) {
            t.plan(5);
            options.url=RelatedMemberships[0];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 404);
            });
            options.url=RelatedMemberships[1];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 400);
            });
            options.url=RelatedMemberships[2];
            server.inject(options, function(response) {
                //t.equal(response.statusCode, 400);
                t.ok(response.result, "no data")
            });
            options.url=RelatedMemberships[3];
            server.inject(options, function(response) {
                 t.equal(response.statusCode, 400);
            });
            options.url=RelatedMemberships[4];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 200);

            });
        });
    },
];