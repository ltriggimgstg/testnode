'use strict';
const privateKey = process.env.JWT_KEY;

const stConfig = {
    provider: 'salesforce',
    isSecure: true,//change to true for prod
    clientId: process.env.CONSUMER_KEY,
    clientSecret: process.env.CONSUMER_SECRET,
    password: process.env.JWT_KEY,
    forceHttps: true,
};
  
if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === undefined){
    stConfig.config = {uri: 'https://dev-sportstg.cs31.force.com/SportsTGMembers'};
} else{
    stConfig.config = {uri: 'https://sportstg.force.com/SportsTGMembers'};
} 
  
const bearer = {
    allowQueryToken: true,              // optional, true by default
    allowMultipleHeaders: false,        // optional, false by default
    accessTokenName: 'auth',    // optional, 'access_token' by default
};  

module.exports = {
    privateKey,
    stConfig,
    bearer,
};
