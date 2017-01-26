var pgp = require('pg-promise')({
    // Initialization Options
});
pgp.pg.defaults.ssl = true;
// Preparing the connection details:
var cn = process.env.DATABASE_URL;

// Creating a new database instance from the connection details:
var db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;