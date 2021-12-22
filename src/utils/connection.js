const mysql = require('mysql');

const dbDetails = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'movies',
};

function dbConnection(dbDetails) {
  return mysql.createConnection(dbDetails);
}
module.exports = { dbDetails, dbConnection };
