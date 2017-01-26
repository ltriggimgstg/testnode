/**
 * Created by Admin on 1/4/2017.
 */
const fs = require('fs');
const fourOFour = { statusCode: 404, error: 'Page not found', message: 'Try a different url' };
module.exports = {
    getContact: {
        handler: function (request, reply) {

            let data = fourOFour;
            let code = 404;
            try {
                data = require(`./../contact/${request.params.id}.json`);
                code = 200;
            } catch (e) {
                // return 404
            }
            return reply(data).code(code);
        }
    },
    updateContact: {
        handler: function (request, reply) {
            let data = fourOFour;
            let code = 404;
            try {
                data = require(`./../contact/${request.params.id}.json`);
                Object.assign(data,request.payload)
                //Write
                fs.writeFile(`./mocker/contact/${request.params.id}.json`, JSON.stringify(data,null,4),function(err){
                    if(err) {
                        return false;
                    } else {
                        return true;
                    }

                });
                code = 200;
            } catch (e) {
                // return 404
            }
            return reply(data).code(code);
        }
    },

    getMember: {
        handler: function (request, reply) {
            let data = fourOFour;
            let code = 404;
            try {
                //Mocked data
                data = [
                    "29875338-2b68-4a98-95c0-8919b038377e",
                    "750f9585-1273-4448-8a7d-561f5154206b"
                ];
                code = 200;
            } catch (e) {
                // return 404
            }
            return reply(data).code(code);
        }
    }
}