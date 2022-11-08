'use strict';
const { createSchemaValidationMiddleware } = require('./validations');
const validate = require('../constants/validationSchemas');
const { PARAM, BODY, QUERY } = require('../constants/reqSides');
const ORDERS = require('../constants/orders');
const moviesMiddleware = {
  getAll: createSchemaValidationMiddleware([
    validate.oneOf('order', { _in: QUERY }, Object.values(ORDERS)),
    validate.text('title', { _in: QUERY }),
    validate.ids('genresIds', { _in: QUERY }),
  ]),
  getOne: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
  ]),
  edit: createSchemaValidationMiddleware([
    validate.id('id', { _in: PARAM, required: true }),
    validate.url('image', { _in: BODY }),
    validate.text('title', { _in: BODY }),
    validate.date('creationDate', { _in: BODY }),
    validate.score('score', { _in: BODY }),
    validate.ids('charactersIds', { _in: BODY }),
    validate.ids('genresIds', { _in: BODY }),
  ]),
  create: createSchemaValidationMiddleware([
    validate.url('image', { _in: BODY }),
    validate.text('title', { _in: BODY, required: true }),
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
