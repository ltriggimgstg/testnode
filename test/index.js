'use strict'
//logging
//const logger = require('../utils/logging');
//const Hapi = require('hapi');
const Glue = require('glue');
const Routes = require('../test/config/routes');
const Manifest = require('../test/config/manifest');
const Path = require('path');
const Test = require('tape');
const Load = require('./account')
        .concat(require('./membership'))
        .concat(require('./organisation'))
        .concat(require('./auth-cache'))
        .concat(require('./others'))
    ;
Glue.compose(Manifest, {relativeTo: Path.join(__dirname, '')}, (err, server) => {
    if (err) {
        throw err;
    }
    server.route(Routes);
//    server.on('response', function (request) {
    //pretty basic at the moment, but better than using Good and having to duplicate the winston transports configs again
//       logger.info( request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
//     });
    for (let i = 0; i < Load.length; i++) {
          Load[i](Test, server);
    }
    server.stop({timeout:3000});
    //tests

});