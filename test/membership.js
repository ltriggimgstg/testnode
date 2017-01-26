'use strict';
const Params = require('../test/config/params');

const MemberPreferences=[
    '/',
    '/Membership/{membershipId}/MemberPreferences',
    '/Membership/' + Params.membershipId + '/MemberPreferences',
        
]


let options = { 
    method: 'GET',
    url: ''
};

module.exports =[
    function (test,server){
        test('Membership -> MemberPreferences', function (t) {
            t.plan(3);
            options.url=MemberPreferences[0];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 404);
            });
            options.url=MemberPreferences[1];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 400);
            });
            options.url=MemberPreferences[2];
            server.inject(options, function(response) {
                t.equal(response.statusCode, 200);
            });
        });
    },
];