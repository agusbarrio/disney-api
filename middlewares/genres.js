'use strict';
const { createSchemaValidationMiddleware } = require('./validations');
const validate = require('../constants/validationSchemas');
const { PARAM, BODY } = require('../constants/reqSides');
const genresMiddleware = {
  getOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
  edit: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
    validate.image('image', { _in: BODY }),
    validate.text('name', { _in: BODY }),
  ]),
  create: createSchemaValidationMiddleware([
    validate.image('image', { _in: BODY }),
    validate.text('name', { _in: BODY, required: true }),
  ]),
  deleteOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
};

module.exports = genresMiddleware;
