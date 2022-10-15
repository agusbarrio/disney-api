'use strict';
const { createSchemaValidationMiddleware } = require('./validations');
const validate = require('../constants/validationSchemas');
const { PARAM, BODY } = require('../constants/reqSides');
const charactersMiddleware = {
  getOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
  edit: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
    validate.image('image', { _in: BODY }),
    validate.text('name', { _in: BODY }),
    validate.age('age', { _in: BODY }),
    validate.weight('weight', { _in: BODY }),
    validate.paragraph('story', { _in: BODY }),
    validate.ids('moviesIds', { _in: BODY }),
  ]),
  create: createSchemaValidationMiddleware([
    validate.image('image', { _in: BODY }),
    validate.text('name', { _in: BODY, required: true }),
    validate.age('age', { _in: BODY }),
    validate.weight('weight', { _in: BODY }),
    validate.paragraph('story', { _in: BODY }),
    validate.ids('moviesIds', { _in: BODY }),
  ]),
  deleteOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
};

module.exports = charactersMiddleware;
