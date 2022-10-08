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
    validate.name('name', { _in: BODY, required: true }),
    validate.age('age', { _in: BODY }),
    validate.weight('weight', { _in: BODY }),
    validate.story('story', { _in: BODY }),
    validate.ids('programIds', { _in: BODY }),
  ]),
  create: createSchemaValidationMiddleware([
    validate.image('image', { _in: BODY }),
    validate.name('name', { _in: BODY, required: true }),
    validate.age('age', { _in: BODY }),
    validate.weight('weight', { _in: BODY }),
    validate.story('story', { _in: BODY }),
    validate.ids('programIds', { _in: BODY }),
  ]),
  deleteOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
};

module.exports = charactersMiddleware;
