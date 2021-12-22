const express = require('express');

const router = express.Router();

const Joi = require('@hapi/joi');

const moviesFuntions = require('../models/movie');

router.get('/', (req, res, next) => {
  moviesFuntions.getAllMoviesData().then((data) => { res.send(data); }).catch(next);
});
router.get('/:id', async (req, res, next) => {
  try {
    const validate = Joi.validate({ id: req.params.id }, moviesFuntions.moviesSchema);
    if (validate.error === null) {
      const data = await moviesFuntions.getMovieById(req.params.id);
      if (data.length === 0) {
        res.status(404).send('BAD Request');
      } else {
        res.status(200).send(data);
      }
    } else {
      res.status(400).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const validate = Joi.validate({ id: req.params.id }, moviesFuntions.moviesSchema);
    if (validate.error === null) {
      const data = await moviesFuntions.deletemovieById(req.params.id);
      if (data.length === 0) {
        res.status(404).send('BAD Request');
      } else {
        res.status(200).send(data);
      }
    } else {
      res.status(400).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    const validate = Joi.validate({ ...{ id: req.params.id }, ...req.body }, moviesFuntions.moviesSchema);
    if (validate.error === null) {
      const data = await moviesFuntions.updateMovieData(req.body, req.params.id);
      if (data.length === 0) {
        res.status(404).send('BAD Request');
      } else {
        res.status(200).send(data.message);
      }
    } else {
      res.status(400).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const validate = Joi.validate(req.body, moviesFuntions.moviesSchema);
    if (validate.error === null) {
      const data = await moviesFuntions.insertMovieData(req.body);
      if (data.length === 0) {
        res.status(404).send('BAD Request');
      } else {
        res.status(201).send(` Inserted Id is ${data.insertId}`);
      }
    } else {
      res.status(400).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
