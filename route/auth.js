'use strict';
module.exports = {
    login: {
        auth: {
            strategy: 'salesforce',
            mode: 'try'
        },
        handler: function (request, reply) {
            request.server.plugins.auth.login(request)
            .then(token => {
                return reply(`token ${token} set`)
                    .header('Authorization', token); 
            })
            .catch(err =>{
                return reply(err);
            });
        }
    },
};