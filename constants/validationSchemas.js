'use strict';
const { ERROR_MESSAGES } = require('./errors');
const {
  twoDecimalRound,
  convertToString,
  onlyInts,
} = require('../services/utils');
const { initialValidation } = require('../middlewares/validations');

//schemas
const schemas = {
  password: {
    length: { min: 6, max: 50 },
  },
  weight: {
    range: { min: 0, max: 100000 },
  },
  paragraph: {
    length: { min: 0, max: 1000 },
  },
  age: {
    range: { min: 0, max: 10000 },
  },
  text: {
    length: { min: 1, max: 100 },
  },
  score: {
    range: { min: 0, max: 5 },
  },
  id: {
    range: { min: 0 },
  },
  ids: {
    length: { min: 0 },
  },
};

//validations
const validate = {
  password: (field, options) =>
    initialValidation(field, options)
      .isLength(schemas.password.length)
      .withMessage(
        ERROR_MESSAGES.INVALID_LENGTH_FIELD(field, schemas.password.length)
      )
      .customSanitizer(convertToString),
  email: (field, options) =>
    initialValidation(field, options)
      .normalizeEmail()
      .isEmail()
      .withMessage(ERROR_MESSAGES.INVALID_EMAIL_FIELD(field)),
  image: (field, options) =>
    initialValidation(field, options)
      .isURL()
      .withMessage(ERROR_MESSAGES.INVALID_URL_FIELD(field)),
  text: (field, options) =>
    initialValidation(field, options)
      .isLength(schemas.text.length)
      .withMessage(
        ERROR_MESSAGES.INVALID_LENGTH_FIELD(field, schemas.text.length)
      ),
  weight: (field, options) =>
    initialValidation(field, options)
      .isFloat(schemas.weight.range)
      .withMessage(
        ERROR_MESSAGES.INVALID_RANGE_FLOAT_FIELD(field, schemas.weight.range)
      )
      .customSanitizer(twoDecimalRound),
  story: (field, options) =>
    initialValidation(field, options)
      .isLength(schemas.story.length)
      .withMessage(
        ERROR_MESSAGES.INVALID_LENGTH_FIELD(field, schemas.story.length)
      )
      .customSanitizer(convertToString),
  age: (field, options) =>
    initialValidation(field, options)
      .isInt(schemas.age.range)
      .withMessage(
        ERROR_MESSAGES.INVALID_RANGE_INT_FIELD(field, schemas.age.range)
      )
      .customSanitizer(twoDecimalRound),
  paragraph: (field, options) =>
    initialValidation(field, options)
      .isLength(schemas.paragraph.length)
      .withMessage(
        ERROR_MESSAGES.INVALID_LENGTH_FIELD(field, schemas.paragraph.length)
      ),
  date: (field, options) =>
    initialValidation(field, options)
      .isDate()
      .withMessage(ERROR_MESSAGES.INVALID_DATE_FIELD(field)),
  score: (field, options) =>
    initialValidation(field, options)
      .isFloat(schemas.score.range)
      .withMessage(
        ERROR_MESSAGES.INVALID_RANGE_FLOAT_FIELD(field, schemas.score.range)
      )
      .customSanitizer(twoDecimalRound),
  id: (field, options) =>
    initialValidation(field, options)
      .isInt(schemas.id.range)
      .withMessage(
        ERROR_MESSAGES.INVALID_RANGE_INT_FIELD(field, schemas.id.range)
      )
      .toInt(),
  ids: (field, options) =>
    initialValidation(field, options)
      .isArray()
      .withMessage(ERROR_MESSAGES.INVALID_ARRAY(field, schemas.ids.length))
      .custom(onlyInts(schemas.id.range))
      .withMessage(ERROR_MESSAGES.ONLY_INTS(field, schemas.id.range)),
};

module.exports = validate;
