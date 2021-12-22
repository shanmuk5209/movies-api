const express = require('express');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const path = require('path');

const fs = require('fs');

const app = express();
const port = process.env.NODE_ENV || 3000;
const movieRoutes = require('./src/routes/movies');
const directorRoutes = require('./src/routes/directors');
// app configurations
app.set('port', port);

// load app middlewares
app.use(morgan('dev', {
  skip(req, res) {
    return res.statusCode < 400;
  },
}));

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'utils/access.log'), {
    flags: 'a',
  }),
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.get('/', (req, res) => {
  res.send('Welcome to RestFul API');
});
// load our API routes
app.use('/movies', movieRoutes);
app.use('/directors', directorRoutes);
// establish http server connection
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
