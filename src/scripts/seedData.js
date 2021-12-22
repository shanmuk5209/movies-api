const {
  dbConnection,
  dbDetails,
} = require('../utils/connection');
const moviesJsonData = require('../../json/movies.json');

const con = dbConnection(dbDetails);
const dropTable = name => new Promise((resolve, reject) => {
  con.query(`DROP TABLE IF EXISTS ${name}`, (error, result) => {
    if (error) reject(error);
    console.log(`Table Drop ${name}`);
    resolve(result);
  });
});
const createTable = (name, query) => new Promise((resolve, reject) => {
  const sql = `CREATE TABLE ${name} ${query} `;
  con.query(sql, (error, result) => {
    if (error) reject(error);
    console.log(`Table created ${name}`);
    resolve(result);
  });
});
const insertDirectorData = (movies) => {
  const uniqueDirectors = new Set();
  movies.forEach((movie) => {
    uniqueDirectors.add(movie.Director);
  });
  uniqueDirectors.forEach(movie => new Promise((resolve, reject) => {
    con.query(`INSERT INTO directorsData(Director_Name) VALUES ('${movie}')`, (error, result) => {
      console.log('inserting', movie);
      if (error) reject(error);
      resolve(result);
    });
  }));
};
const insertMoviesData = (movies) => {
  movies.forEach(movie => new Promise((resolve, reject) => {
    const sql = `INSERT INTO moviesData (Rank, Title, Description, Runtime, Genre, Rating, Metascore, Votes, Gross_Earning_in_Mil, Director_id, Actor, Year )
       VALUES (${movie.Rank}, "${movie.Title}", "${movie.Description}", ${movie.Runtime}, "${movie.Genre}", ${movie.Rating}, ${movie.Metascore}, ${movie.Votes},
        ${movie.Gross_Earning_in_Mil},(select Id from directorsData where Director_Name = "${movie.Director}"), "${movie.Actor}", ${movie.Year})`;
    con.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }));
  console.log('Movies Data Inserted');
};
const startSeed = async () => {
  try {
    await dropTable('moviesData');
    await dropTable('directorsData');
    await createTable('directorsData', '(Id INT AUTO_INCREMENT PRIMARY KEY, Director_Name VARCHAR(50) NOT NULL)');
    await createTable('moviesData', `(ID INT PRIMARY KEY AUTO_INCREMENT, 
    Rank INT, Title VARCHAR(50) NOT NULL, Description LONGTEXT, 
    Runtime INT(11), Genre VARCHAR(50), Rating FLOAT, Metascore INT, 
    Votes BIGINT, Gross_Earning_in_Mil INT, Director_id INT NOT NULL, 
    FOREIGN KEY (Director_id) REFERENCES directorsData(Id) ON UPDATE 
    CASCADE ON DELETE CASCADE, Actor VARCHAR(50), Year INT(11))`);
    await insertDirectorData(moviesJsonData);
    console.log('Directors Data Inserted');
    await insertMoviesData(moviesJsonData);
  } catch (error) {
    console.log(error);
  }
};
startSeed();
