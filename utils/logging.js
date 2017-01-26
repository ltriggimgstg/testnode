'use strict';

//winston logging
const Winston = require('winston');
//app configuration
const AppConfig = require('../config/app')
//bulk winston to loggly transport
require('winston-loggly-bulk');

var env = process.env.NODE_ENV || 'development';

var loggingTransports = [
  // console logging output
  new Winston.transports.Console({
    level: AppConfig.logging.console.level,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    colorize: true
  })
];

// Loggly logging if in production
if (env === 'production') {
  loggingTransports.push(
    new Winston.transports.Loggly({
      level: env === 'development' ? 'debug' : 'error',
      token: AppConfig.logging.loggly.token,
      subdomain: AppConfig.logging.loggly.subdomain,
      tags: AppConfig.logging.loggly.tags,
      json: true,
      handleExceptions: true
    })
  );
}

//configure Winston
Winston.Logger({
  transports: loggingTransports,
  exitOnError: false
});

module.exports = Winston;
