const { ERROR_MESSAGES } = require('./errors');
const { check } = require('express-validator');
const VALIDATION_SCHEMAS = {
  PASSWORD: check('password')
    .notEmpty()
    .withMessage(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage(ERROR_MESSAGES.INVALID_PASSWORD)
    .bail(),

  EMAIL: check('email')
    .notEmpty()
    .withMessage(ERROR_MESSAGES.EMAIL_REQUIRED)
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage(ERROR_MESSAGES.INVALID_EMAIL)
    .bail(),
};

module.exports = VALIDATION_SCHEMAS;
