const mysql = require('mysql2/promise');
const Connection = {};

Connection.getConnection = async () => await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD
});

module.exports = Connection;
