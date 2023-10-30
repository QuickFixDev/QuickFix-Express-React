const fs = require('fs');

const dbConfig = {
    connectionLimit    : 10,
    connectionTimeout  : 60 * 60 * 1000,
    acquireTimeout     : 60 * 60 * 1000,
    timeout            : 60 * 60 * 1000,

    host: "quickfix-db.mysql.database.azure.com",
    user: 'Juan_Hernandez',
    password: "3xbr34nHmY?",
    database: "quickfix",
    port: 3306,

    ssl: {
        ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
    }

};

module.exports = dbConfig;