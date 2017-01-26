'use strict';
const QueryFile = require('pg-promise').QueryFile;
const Path = require('path');

// Helper for linking to external query files:
function sql(file) {
    const fullPath = Path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

const sqlProvider = {
    settlement: {
        getSettlement: sql('./settlement/getSettlement.sql')
    }
};

module.exports = sqlProvider;
