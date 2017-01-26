
const Hapi = require('hapi');

const mocker = new Hapi.Server();
mocker.connection({ 
    host: 'localhost', 
    port: 4444 
});

const fourOFour = [{statusCode: 404, errorCode: "Page not found", message: "Try a different url"}];
/*let data = fourOFour;
let code = 404;*/
mocker.ext('onPreResponse', function(request, reply) {
    if ( request.response.isBoom) {
            console.log(request.response)
            return reply(fourOFour).code(404)
        
    }
    return reply.continue();
});

mocker.route(

    
    
    
    [{method: 'GET', path: '/services/data/v38.0/sobjects/Contact/{id}', config: { handler: function (request, reply) {
        return reply (require(`./data/contact_${request.params.id}.json`)).code(200);
    }}},
    {method: 'PATCH', path: '/services/data/v38.0/sobjects/Contact/{id}', config: { handler: function (request, reply) {
        return reply (require(`./data/contact_${request.params.id}.json`)).code(200);
    }}},
    {method: 'GET', path: '/services/data/v38.0/sobjects/Member__c/describe/', config: { handler: function (request, reply) {
        return reply(require('./data/member_describe.json')).code(200);
    }}},
    {method: 'GET', path: '/services/data/v38.0/query/', config: { handler: function (request, reply) {
        const qry = request.query.q.split('=');
        switch(qry[0]){
            case 'Select id, Member__c, Member__r.HerokuId__c from MemberSecurityPermission__c where Related3rdParty__c ':
                return reply(require('./data/relatedMembership_.json')).code(200);
        }
        return reply(fourOFour).code(404);        
    }}},
    {method: 'POST', path: '/services/oauth2/token', config: { handler: function (request, reply) {
        return reply({access_token: 'dummy',instance_url: 'http://localhost'}).code(200);
    }}},
    {method: 'POST', path: '/services/oauth2/token/', config: { handler: function (request, reply) {
        return reply(require('./data/member_describe.json')).code(200);
    }}},
    ]
    
);//Select id, Member__c, Member__r.HerokuId__c from MemberSecurityPermission__c where Related3rdParty__c = '${id}'

mocker.start((err) => {
    if (err) {throw err; }  
    console.log('Mocker running at:', mocker.info.uri);
});