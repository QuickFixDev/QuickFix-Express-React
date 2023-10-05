const mysql = require('mysql');
const dbConfig = require('./dbConfig');

const pool = mysql.createPool(dbConfig);
module.exports = pool;