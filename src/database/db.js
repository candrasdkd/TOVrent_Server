const mysql = require("mysql");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
// console.log(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
const mysqlConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});


module.exports = mysqlConnection