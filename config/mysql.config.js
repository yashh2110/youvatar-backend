const mysql = require("mysql2");
const {
  mysql_url,
  mysql_username,
  mysql_database,
  mysql_password,
} = require("./config");
// require("dotenv").config();
const mysqlConn = mysql.createPool({
  host: mysql_url,
  user: mysql_username,
  database: mysql_database,
  password: mysql_password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = mysqlConn;
