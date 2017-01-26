const fourOFour = { statusCode: 404, error: 'Page not found', message: 'Try a different url' };

module.exports = {
    getPicklists: {
        handler: function (request, reply) {
            let data = fourOFour;
            let code = 404;
            try {
                //Mocked data
                data = require(`./../picklists/picklists.json`);
                code = 200;
            } catch (e) {
                // return 404
            }
            return reply(data).code(code);
        }
    },
    getProvinces: {
        handler: function (request, reply) {
            let data = fourOFour;
            let code = 404;
            try {
                //Mocked data
                //data = require(`./../picklists/provinces/${request.params.countryCode}.json`);
                //Write
                code = 200;
            } catch (e) {
                // return 404
            }
            return reply(data).code(code);
        }
    }
}