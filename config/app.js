'use strict';

var env = process.env.NODE_ENV || 'development';

module.exports = {
  logging: {
    console: {
      level: env !== 'production' ? 'info' : 'error'
    },
    loggly: {
      level: 'error',
      token: "55d8291a-d8d4-4c34-a0f6-8b556d90f84f",
      subdomain: "foxsportspulse",
      tags: [
        "APP-membership-poc"
      ]
    }
  }
};
