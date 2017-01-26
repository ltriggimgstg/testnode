'use strict';

module.exports = {

    getAuthToken: function (payload) {
        //mocked data
        var result = {
            "accessToken": "vASBCNAM"
        };
        return new Promise(
            function (resolve, reject) {
                resolve(result);
            });
    },

    login: function () {
        //mocked data
        var result = {
            "accountId": "0032800000U4mKAAAZ",
            "accessToken": "vASBCNAM",
            "memberId": "29875338-2b68-4a98-95c0-8919b038377e"
        };
        return new Promise(
            function (resolve, reject) {
                resolve(result);
            });
    },

};
