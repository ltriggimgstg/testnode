module.exports = {
    getLinkedMember: {
        handler: function (request, reply) {
            const fourOFour = { statusCode: 404, error: 'Page not found', message: 'Try a different url' };
            let data = fourOFour;
            let code = 404;
            try {
                //Mocked data
                data = require(`./../member/linkedMember.json`);
                code = 200;
            } catch (e) {
                // return 404
            }
            return reply(data.ids).code(code);
        }
    }
}