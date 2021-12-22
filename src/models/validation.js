const Joi = require('@hapi/joi');

const moviesSchema = Joi.object().keys({
  id: Joi.number().integer(),
  Rank: Joi.number().integer(),
  Title: Joi.strict(),
  Description: Joi.string(),
  Runtime: Joi.number().integer(),
  Genre: Joi.string(),
  Rating: Joi.number(),
  Metascore: Joi.number().integer(),
  Votes: Joi.number().integer(),
  Gross_Earning_in_Mil: Joi.number().integer(),
  Director_id: Joi.number().integer(),
  Actor: Joi.string(),
  Year: Joi.number().integer(),
});
const directorSchema = Joi.object().keys({
  id: Joi.number().integer(),
  Director_Name: Joi.string().alphanum(),
});

module.exports = { directorSchema, moviesSchema };
