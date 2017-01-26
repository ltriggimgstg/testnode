'use strict';

const Params = require('../test/config/params');

const MembershipSubscription=[
    '/',
    '/Organisation/{organisationId}/MembershipSubscription',
    '/Organisation/' + Params.organisationId + '/MembershipSubscription',
        
]


let options = { 
    method: 'POST',
    url: ''
};

module.exports =[
    function (test,server){
        test('Organisation -> MembershipSubscription', function (t) {
            t.plan(3);
            options.url=MembershipSubscription[0];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 404);
            });
            options.url=MembershipSubscription[1];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 400);
            });
            options.url=MembershipSubscription[2];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 200);
            });
        });
    },
];