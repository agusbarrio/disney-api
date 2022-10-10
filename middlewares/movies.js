'use strict';
const { createSchemaValidationMiddleware } = require('./validations');
const validate = require('../constants/validationSchemas');
const { PARAM, BODY } = require('../constants/reqSides');
const moviesMiddleware = {
  getOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
  edit: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
    validate.image('image', { _in: BODY }),
    validate.title('title', { _in: BODY }),
    validate.date('creationDate', { _in: BODY }),
    validate.score('score', { _in: BODY }),
    validate.ids('charactersIds', { _in: BODY }),
    validate.ids('genresIds', { _in: BODY }),
  ]),
  create: createSchemaValidationMiddleware([
    validate.image('image', { _in: BODY }),
    validate.title('title', { _in: BODY, required: true }),
    validate.date('creationDate', { _in: BODY }),
    validate.score('score', { _in: BODY }),
    validate.ids('charactersIds', { _in: BODY }),
    validate.ids('genresIds', { _in: BODY }),
  ]),
  deleteOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
};

module.exports = moviesMiddleware;
