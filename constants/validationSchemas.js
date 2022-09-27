const { ERROR_MESSAGES } = require('./errors');
const { check } = require('express-validator');
const {
  twoDecimalRound,
  convertToString,
  isArrayOfIds,
} = require('../services/utils');

//schemas
const validate = {
  password: (field) =>
    check(field)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(field))
      .isLength({ min: 6, max: 50 })
      .withMessage(ERROR_MESSAGES.INVALID_PASSWORD)
      .customSanitizer(convertToString),

  email: (field) =>
    check(field)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(field))
      .normalizeEmail()
      .isEmail()
      .withMessage(ERROR_MESSAGES.INVALID_EMAIL),

  image: (field) =>
    check(field).optional().isURL().withMessage(ERROR_MESSAGES.INVALID_URL),

  name: (field) =>
    check(field)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(field))
      .isLength({ min: 1, max: 50 })
      .withMessage(ERROR_MESSAGES.INVALID_NAME_LENGTH)
      .isAlpha()
      .withMessage(ERROR_MESSAGES.INVALID_NAME),

  weight: (field) =>
    check(field)
      .optional()
      .isFloat({ min: 0, max: 100000 })
      .withMessage(ERROR_MESSAGES.INVALID_WEIGHT)
      .customSanitizer(twoDecimalRound),

  story: (field) =>
    check(field)
      .optional()
      .isLength({ max: 1000 })
      .withMessage(ERROR_MESSAGES.INVALID_STORY_LENGHT)
      .customSanitizer(stringSanitizer),

  age: (field) =>
    check(field)
      .optional()
      .isInt({ min: 0, max: 10000 })
      .withMessage(ERROR_MESSAGES.INVALID_AGE)
      .customSanitizer(twoDecimalRoundSanitizier),

  title: (field) =>
    check(field)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(field))
      .isLength({ min: 1, max: 100 })
      .withMessage(ERROR_MESSAGES.INVALID_TITLE_LENGTH),

  creationDate: (field) =>
    check(field)
      .optional()
      .isDate()
      .withMessage(ERROR_MESSAGES.INVALID_CREATION_DATE),

  score: (field) =>
    check(field)
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage(ERROR_MESSAGES.INVALID_SCORE)
      .customSanitizer(twoDecimalRoundSanitizier),

  id: (field) =>
    check(field)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(field))
      .isInt({ min: 1 })
      .withMessage(ERROR_MESSAGES.INVALID_ID)
      .toInt(),

  ids: (field) =>
    check(field)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(field))
      .custom(isArrayOfIds)
      .withMessage(ERROR_MESSAGES.INVALID_IDS),
};

module.exports = validate;
