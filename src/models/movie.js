const {
  dbConnection,
  dbDetails,
} = require('../utils/connection');

const { moviesSchema } = require('./validation');

const con = dbConnection(dbDetails);
const getAllMoviesData = () => new Promise((resolve, reject) => {
  const sql = `SELECT moviesData.*, directorsData.Director_Name From moviesData 
                 LEFT JOIN directorsData on moviesData.Director_id = directorsData.Id`;
  con.query(sql, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const getMovieById = id => new Promise((resolve, reject) => {
  const sql = `SELECT * FROM moviesData WHERE Id = ${id}`;
  con.query(sql, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const deletemovieById = id => new Promise((resolve, reject) => {
  const sql = `DELETE FROM moviesData WHERE Id = ${id}`;
  con.query(sql, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const insertMovieData = Data => new Promise((resolve, reject) => {
  con.query('INSERT INTO moviesData SET ?', Data, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
const updateMovieData = (Data, id) => new Promise((resolve, reject) => {
  con.query(`UPDATE moviesData SET ? WHERE Id = ${id}`, Data, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
module.exports = {
  updateMovieData,
  insertMovieData,
  getAllMoviesData,
  getMovieById,
  deletemovieById,
  moviesSchema,
};
