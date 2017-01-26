'use strict';

const Logger = require('../utils/logging');
const errorCodes = {
    401: {statusCode: 401, error: 'Unauthorised', message: 'You are not authorised to perform this operation'},
    405: {statusCode: 405, error: 'Method Not Allowed', message: 'An invalid operation occurred'},
    500: {statusCode: 500, error: 'Internal Server Error', message: 'An internal server error occurred'},
};

module.exports = {
    setup: function  (manager){
        return function (request, reply, method){
            manager[method](request)
                .then(data=>reply(data).code(200))
                .catch(data=>{
                    Logger.error(data);
                    const error = data.message.split('|');
                    if(error.length ===2){
                        return reply(JSON.parse(error[1])).code(parseInt(error[0]));
                    }    
                    if(errorCodes[data.message]){
                        reply(errorCodes[data.message]).code(data.message);
                    }
                    reply(errorCodes[500]).code(500);
                });
        }
    },
};
