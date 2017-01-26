'use strict'
require('newrelic');
const Logger = require('./utils/logging');
const Glue = require('glue');
const Routes = require('./config/routes');
const Manifest = require('./config/manifest');
const Good = require('good');
const GoodWinston = require('good-winston');
const Auth = require('./config/auth');
const Path = require('path');


Glue.compose(Manifest, {relativeTo: Path.join(__dirname, '')}, (err, server) => {
 server.register({
    register: Good,
    options: {
      reporters: {
        winston: [
          {
            module: 'good-winston',
            args: [
              Logger, {
                error_level: 'info',
                ops_level: 'debug',
                request_level:'debug',
                response_level:'info',
                other_level: 'info',
                color: false,
              }
            ]
          }
        ]
      }
    }
  }, function(err) {
    if (err) {
      Logger.error('Good load error', err);
    }
  });

  if (err) {
      throw err;
  }
  
  server.start(() => {
    Logger.info('Server running at:', server.info.uri);
  });
  // authentifications 
  server.auth.strategy('salesforce', 'bell', false, Auth.stConfig);// try??
  server.auth.strategy('simple', 'bearer-access-token', true, Auth.bearer);
 
  server.ext('onPreAuth', function(request, reply) {
     if( request.query.error ==='OAUTH_APP_ACCESS_DENIED'){
         request.query.denied = true;
     }
     return reply.continue();
 });
  //redirect to salesforce login if no or invalid token
  server.ext('onPreResponse', function(request, reply) {
      if ( request.response.isBoom) {
          if( request.response.output.payload.statusCode===401){
              return reply('x').redirect('/Login')
          }
      }
      return reply.continue();
  });
 
 server.route (Routes);

//development
if(process.env.NODE_ENV ==='development'){
    require('./mocker/index');
}

});

