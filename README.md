# MembPOC
Membership module - vertical sample slice - POC

## Developer Notes

### Setup

 1. Rename template.env to .env and change to suit environment. Do not commit the .env file.
 2. Run 'npm install' to install dependencies
 3. Run 'npm start' or 'nf start'. The module 'foreman' https://github.com/strongloop/node-foreman loads the the Procfile and .env variables into the application.  
 
### Logging

'Winston' is installed. https://www.npmjs.com/package/winston.

Examples: 
Logger.error('I'm an error', err);
Logger.info('Something happened');
Logger.debug('Something to debug');

### Staging Environment 

https://membership-poc-staging.herokuapp.com/

Commits to 'master' are automatically deployed here.

### Development Mocking

There is a dummy oAuth token in template.env currently this is from my dev salesforce site but will be updated to a real dummy token shortly.
To use pass the the value 'auth' = 'Fe26.2\*\*5e069a8518d98c6fad91bc5a9af8f1ca162642bb14166bb113ab9b0dbd1004f1\*WfljIl8cmRYnJVwyuqAW5g\*0xECWG7VCOx5s-b8iq1FVg6xeCM8E-2OU5ElsDSM7Bes2pLwoJYg8qAcvNef7zmh\*\*179d8ebb0f640afa25227ae5dd4ab8d33a75af428166d56cf339f1c07429d1dc*fOPjSg_sNhxSt9wM60RW4LEOaUeISrs3fo6D9UHPocw' in the header, URL or cookie. It will be unencryped and if it is a uuid you are granted access.
The token also directs you to a second local server instead of the salesforce server to mock salesforce calls.
The mock salesforce data will be updated during this week.
