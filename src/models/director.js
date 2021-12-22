const {
  dbConnection,
  dbDetails,
} = require('../utils/connection');

const { directorSchema } = require('./validation');

const con = dbConnection(dbDetails);
const getAllDirectorData = () => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM directorsData ';
  con.query(sql, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const getDirectorById = id => new Promise((resolve, reject) => {
  const sql = `SELECT * FROM directorsData WHERE Id = ${id}`;
  con.query(sql, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const addNewDirector = data => new Promise((resolve, reject) => {
  con.query('INSERT INTO directorsData SET ?', data, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const updateDirectorWithId = (id, directorName) => new Promise((resolve, reject) => {
  const sql = `UPDATE directorsData SET director_Name = '${directorName}' WHERE Id = ${id}`;
  con.query(sql, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const deleteDirectorById = id => new Promise((resolve, reject) => {
  const sql = `DELETE FROM directorsData WHERE Id = ${id}`;
  con.query(sql, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
module.exports = {
  addNewDirector,
  getAllDirectorData,
  getDirectorById,
  deleteDirectorById,
  updateDirectorWithId,
  directorSchema,
};
