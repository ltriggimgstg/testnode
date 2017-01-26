'use strict';
const querystring = require('querystring');

function processResponse(response){
    return new Promise((resolve, reject) => {
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () =>{
        const payload = {body: JSON.parse(body.join('')), status: response.statusCode, headers: response.headers};
        if (response.statusCode < 200 || response.statusCode > 299) {
            //Add all response codes here
            switch (response.statusCode){
                case 401:// unauthorised rerequire authorisation
                    return reject (new Error(`401|${JSON.stringify(payload.body)}`));
                /*case 500:// upstream should 500 translates to 502 
                    return reject(new Error(502));*/
                default:// 404 is a 500 our bad
                    return reject (new Error(`${response.statusCode}|${JSON.stringify(payload.body)}`));
            }
        }else{
            return resolve(payload);
        }
      });
  }) ;
}

class RestApi{
    constructor(protocol, host, headers){
        if(protocol != undefined){
            protocol ==='https'? this.lib=require('https'): this.lib=require('http');
        }
        this.host = host || '';
        this.headers = headers || {};
    }
    
    setProtocol(protocol){
        this.lib =  require(protocol.replace(':',''));  
        return this;  
    }
    
    setHost(host){
        this.host = host;
        return this;
    }
    
    setHeader(name, value){
        this.headers[name] = value;
    }
    
    setPort(value){
        this.port = value;
    }

    get(path){
        return new Promise((resolve, reject) => {
            if(this.lib === undefined){
                reject('Protocol is undefined');
            }
            const object ={
                host: this.host,
                path: path,
                headers: this.headers
            };
            if(this.port != undefined){
                object.port = this.port;
            }
            const request = this.lib.get(object, (response) => {
                processResponse(response, this)
                .then(data => resolve(data))
                .catch(error => reject(error));
            });
            // handle connection errors
              request.on('error', (err) =>{
                  reject(new Error(`500|${JSON.stringify(err)}`));
              });
              
        });
    }
    
    post(path,body){
        return new Promise((resolve, reject) => {
            if(this.lib === undefined){
                reject('Protocol is undefined');
            }
            var postData = querystring.stringify(body);
            const postHeaders = {};
            Object.assign(postHeaders, this.headers);
            postHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
            postHeaders['Content-Length'] = Buffer.byteLength(postData);
            const object ={
                host: this.host,
                path: path,
                headers: postHeaders,
                method: 'POST'
            };
            if(this.port != undefined){
                object.port = this.port;
            }
            const request = this.lib.request(object, (response) => {
                processResponse(response, this)
                .then(data => resolve(data))
                .catch(error => reject(error));
            });
          // handle connection errors
            request.on('error', (error) =>{
                reject(new Error(`500|${JSON.stringify(error)}`));
            });
            request.write(postData);
            request.end();
        });
    }

    request(path,method,body){
        return new Promise((resolve, reject) => {
            if(this.lib === undefined){
                reject('Protocol is undefined');
            }
            var data = querystring.stringify(body);
            const object ={
                host: this.host,
                path: path,
                headers: this.headers,
                method: method
            };
            if(this.port != undefined){
                object.port = this.port;
            }
            const request = this.lib.request(object, (response) => {
                processResponse(response, this)
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            });
            // handle connection errors
            request.on('error', (err) =>{
                reject(new Error(`500|${JSON.stringify(err)}`));
            });
            request.write(data);
            request.end();
        });
    }

    put(path, body){
        this.setHeader('Content-Type','application/x-www-form-urlencoded');
        var data = querystring.stringify(body);
        this.setHeader('Content-Length',Buffer.byteLength(data));

        return this.request(path,'PUT',body).then(data=>{
            return data;
        });
    }
    
    patch(path, body){
        this.setHeader('Content-Type','application/x-www-form-urlencoded');
        var data = querystring.stringify(body);
        this.setHeader('Content-Length',Buffer.byteLength(data));

        return this.request(path,'PATCH',body).then(data=>{
            return data;
        });
    }
}

module.exports = RestApi;
