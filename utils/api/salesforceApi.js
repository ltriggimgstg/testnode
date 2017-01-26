'use strict';
const Rest = require('./restApi');
//const url = 'ap2.salesforce.com'; 
const api = '/services/data/v38.0/';
let  uri = 'https://login.salesforce.com';
let protocol = 'https';
switch (process.env.NODE_ENV){
    case 'development':
        uri = 'http://localhost:4444';
        protocol = 'http';
        break;
    case 'staging':
    case undefined:
        uri = 'https://test.salesforce.com';
        break;
}
//const apiVer = '38.0';

function parseQry(qry){
    // encode query for transport to salesforce
    return(qry.replace(/ /g, '+').replace(/=/g,'%3D'));
}

class SalesforceApi extends Rest{
    constructor(auth){
        super();
        if(auth !==undefined){
            this.auth = auth;
            this.urls = auth.profile.raw.urls;
            const url = this.urls.query.split('/');
            const server =url[2].split(':');
            this.setProtocol(url[0]);
            this.setHost(server[0]);
            if(server.length >1){
                this.setPort(server[1]);
            }
            this.setHeader('Authorization', `Bearer ${auth.token}`);
        }
    }
    
    getObj(path){
        return this.get(`${api}sobjects/${path}`);
    }
    
    getQry(qry){
        const cleanQry = parseQry(qry);
        return this.get(`${api}query/?q=${cleanQry}`);
    }
    
    parseError(error){
        // format error for standard replies
        //console.log(error)
        const msg=error.message.split('|');
        const body = JSON.parse(msg[1])[0];
        error.message = `${msg[0]}|${JSON.stringify({statusCode: msg[0], error: body.errorCode, message: body.message})}`;
        throw error;
    }
    
    /*    methods */
    refreshToken(){
        const _that = this;
        //console.log(process.env.REFRESH_TOKEN)
        return new Promise(
            function(resolve, reject){
                const payload={
                    grant_type: 'refresh_token',
                    client_id: process.env.CONSUMER_KEY,
                    client_secret: process.env.CONSUMER_SECRET,
                    refresh_token: process.env.REFRESH_TOKEN,
                };
                const conn= uri.split('//')[1].split(':');
                _that.setProtocol(protocol);
                _that.setHost(conn[0]);
                if(conn.length > 1){
                    _that.setPort(conn[1])
                }
                _that.post('/services/oauth2/token', payload)
                .then(auth => {
                    _that.setHeader('Authorization', `Bearer ${auth.body.access_token}`);
                    _that.setHost(auth.body.instance_url.split('//')[1]);
                    resolve();
                })
                .catch(error => {console.log(error);reject(error)});
            }
        );
    }
    
    getPicklists(){
        return  this.refreshToken()
        .then(() => this.getObj('Member__c/describe/'))
        .catch(e => this.parseError(e));
    }
    
    getContact(id){
    //    console.log(`Contact/${id}`)
        return this.getObj(`Contact/${id}`)
        .catch(e => this.parseError(e));
    }

    updateContact(id,personalInfo){
         return this.patch(`${api}sobjects/Contact/${id}`,personalInfo)
            .catch(e => {
                //this.parseError(e)
                console.log(e);
            });
    }
    
    getLinkedMembers(id){
        //00528000003VfOrAAK
        return this.getQry(`Select id, Member__c, Member__r.HerokuId__c from MemberSecurityPermission__c where Related3rdParty__c = '${id}'`)
        .catch(e => this.parseError(e));
    }

    getProvinces(countryCode){
        return this.getObj(`Provinces/${countryCode}`)
            .catch(e => this.parseError(e));
    }

}

module.exports = {
    SalesforceApi
};