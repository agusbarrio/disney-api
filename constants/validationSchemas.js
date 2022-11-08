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
  positiveFloat: {
    range: { min: 0, max: 100000 },
  },
  paragraph: {
    length: { min: 0, max: 1000 },
  },
  positiveInt: {
    range: { min: 0, max: 10000 },
  },
  text: {
    length: { max: 100 },
  },
  score: {
    range: { min: 0, max: 5 },
  },
  id: {
    range: { min: 1 },
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
  url: (field, options) =>
    initialValidation(field, options)
      .isURL()
      .withMessage(ERROR_MESSAGES.INVALID_URL_FIELD(field)),
  text: (field, options) =>
    initialValidation(field, options)
      .isLength(schemas.text.length)
      .withMessage(
        ERROR_MESSAGES.INVALID_LENGTH_FIELD(field, schemas.text.length)
      ),
  positiveFloat: (field, options) =>
    initialValidation(field, options)
      .isFloat(schemas.positiveFloat.range)
      .withMessage(
        ERROR_MESSAGES.INVALID_RANGE_FLOAT_FIELD(
          field,
          schemas.positiveFloat.range
        )
      )
      .customSanitizer(twoDecimalRound),
  positiveInt: (field, options) =>
    initialValidation(field, options)
      .isInt(schemas.positiveInt.range)
      .withMessage(
        ERROR_MESSAGES.INVALID_RANGE_INT_FIELD(field, schemas.positiveInt.range)
      )
      .customSanitizer(twoDecimalRound),
  paragraph: (field, options) =>
    initialValidation(field, options)
      .isLength(schemas.paragraph.length)
      .withMessage(
        ERROR_MESSAGES.INVALID_LENGTH_FIELD(field, schemas.paragraph.length)
      )
      .customSanitizer(convertToString),
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
      .toArray()
      .isArray()
      .withMessage(ERROR_MESSAGES.INVALID_ARRAY(field, schemas.ids.length))
      .custom(onlyInts(schemas.id.range))
      .withMessage(ERROR_MESSAGES.ONLY_INTS(field, schemas.id.range))
      .customSanitizer((v) => v.map((el) => Number(el))),
  oneOf: (field, options, enumArray = []) =>
    initialValidation(field, options)
      .isIn(enumArray)
      .withMessage(ERROR_MESSAGES.INVALID_ENUM_FIELD(field, enumArray)),
};

module.exports = validate;
