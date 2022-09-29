const { ERROR_MESSAGES } = require('./errors');
const {
  twoDecimalRound,
  convertToString,
  isArrayOfIds,
  validationMiddleware,
} = require('../services/utils');

//schemas
const validate = {
  password: validationMiddleware((param) =>
    param
      .isLength({ min: 6, max: 50 })
      .withMessage(ERROR_MESSAGES.INVALID_PASSWORD)
      .customSanitizer(convertToString)
  ),
  email: validationMiddleware((param) =>
    param.normalizeEmail().isEmail().withMessage(ERROR_MESSAGES.INVALID_EMAIL)
  ),
  image: validationMiddleware((param) =>
    param.isURL().withMessage(ERROR_MESSAGES.INVALID_IMAGE)
  ),
  name: validationMiddleware((param) =>
    param
      .isLength({ min: 1, max: 50 })
      .withMessage(ERROR_MESSAGES.INVALID_NAME_LENGTH)
      .isAlpha()
      .withMessage(ERROR_MESSAGES.INVALID_NAME)
  ),
  weight: validationMiddleware((param) =>
    param
      .isFloat({ min: 0, max: 100000 })
      .withMessage(ERROR_MESSAGES.INVALID_WEIGHT)
      .customSanitizer(twoDecimalRound)
  ),
  story: validationMiddleware((param) =>
    param
      .isLength({ max: 1000 })
      .withMessage(ERROR_MESSAGES.INVALID_STORY_LENGHT)
      .customSanitizer(convertToString)
  ),
  age: validationMiddleware((param) =>
    param
      .isInt({ min: 0, max: 10000 })
      .withMessage(ERROR_MESSAGES.INVALID_AGE)
      .customSanitizer(twoDecimalRound)
  ),
  title: validationMiddleware((param) =>
    param
      .isLength({ min: 1, max: 100 })
      .withMessage(ERROR_MESSAGES.INVALID_TITLE_LENGTH)
  ),
  creationDate: validationMiddleware((param) =>
    param.isDate().withMessage(ERROR_MESSAGES.INVALID_CREATION_DATE)
  ),
  score: validationMiddleware((param) =>
    param
      .isFloat({ min: 0, max: 5 })
      .withMessage(ERROR_MESSAGES.INVALID_SCORE)
      .customSanitizer(twoDecimalRound)
  ),

  id: validationMiddleware((param) =>
    param.isInt({ min: 1 }).withMessage(ERROR_MESSAGES.INVALID_ID).toInt()
  ),

  ids: validationMiddleware((param) =>
    param.custom(isArrayOfIds).withMessage(ERROR_MESSAGES.INVALID_IDS)
  ),
};

module.exports = validate;
