const express = require('express');

const router = express.Router();

const Joi = require('@hapi/joi');

const directorsFuntions = require('../models/director');

router.get('/', (req, res, next) => {
  directorsFuntions.getAllDirectorData().then((data) => { res.send(data); }).catch(next);
});
router.get('/:id', async (req, res, next) => {
  try {
    const validate = Joi.validate({ id: req.params.id }, directorsFuntions.directorSchema);
    if (validate.error === null) {
      const data = directorsFuntions.getDirectorById(req.params.id);
      if (data.length === 0) {
        res.status(400).send('BAD REQUEST');
      } else {
        res.status(200).send(data);
      }
    } else {
      res.status(404).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const validate = Joi.validate({ id: req.params.id }, directorsFuntions.directorSchema);
    if (validate.error === null) {
      const data = directorsFuntions.deleteDirectorById(req.params.id);
      if (data.length === 0) {
        res.status(400).send('BAD REQUEST');
      } else {
        res.status(200).send(data);
      }
    } else {
      res.status(404).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    const validate = Joi.validate({ ...{ id: req.params.id }, ...req.body }, directorsFuntions.directorSchema);
    if (validate.error === null) {
      const data = await directorsFuntions.updateDirectorWithId(req.params.id, req.body.Director_Name);
      if (data.length === 0) {
        res.status(400).send('BAD REQUEST');
      } else {
        res.status(200).send(data);
      }
    } else {
      res.status(404).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const validate = Joi.validate(req.body, directorsFuntions.directorSchema);
    if (validate.error === null) {
      const data = await directorsFuntions.addNewDirector(req.body);
      if (data.length === 0) {
        res.status(400).send('BAD REQUEST');
      } else {
        res.status(201).send(data);
      }
    } else {
      res.status(404).send(validate.error.details[0].message);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
