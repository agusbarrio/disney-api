'use strict';
const { createSchemaValidationMiddleware } = require('./validations');
const validate = require('../constants/validationSchemas');
const { PARAM, BODY, QUERY } = require('../constants/reqSides');
const charactersMiddleware = {
  getAll: createSchemaValidationMiddleware([
    validate.text('name', { _in: QUERY }),
    validate.positiveInt('age', { _in: QUERY }),
    validate.ids('moviesIds', { _in: QUERY }),
  ]),
  getOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
  edit: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
    validate.url('image', { _in: BODY }),
    validate.text('name', { _in: BODY }),
    validate.positiveInt('age', { _in: BODY }),
    validate.positiveFloat('weight', { _in: BODY }),
    validate.paragraph('story', { _in: BODY }),
    validate.ids('moviesIds', { _in: BODY }),
  ]),
  create: createSchemaValidationMiddleware([
    validate.url('image', { _in: BODY }),
    validate.text('name', { _in: BODY, required: true }),
    validate.positiveInt('age', { _in: BODY }),
    validate.positiveFloat('weight', { _in: BODY }),
    validate.paragraph('story', { _in: BODY }),
    validate.ids('moviesIds', { _in: BODY }),
  ]),
  deleteOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
};

module.exports = charactersMiddleware;
