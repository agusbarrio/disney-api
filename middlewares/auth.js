'use strict';
const { createSchemaValidationMiddleware } = require('../services/utils');
const VALIDATION_SCHEMAS = require('../constants/validationSchemas');
const authService = require('../services/auth');

const accessValidation = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userId = await authService.validToken(token);
    //all routes that require access will have the user id available in req.userId
    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};

const registerSchemaValidation = createSchemaValidationMiddleware({
  email: VALIDATION_SCHEMAS.EMAIL,
  password: VALIDATION_SCHEMAS.PASSWORD,
});

const loginSchemaValidation = createSchemaValidationMiddleware({
  email: VALIDATION_SCHEMAS.EMAIL,
  password: VALIDATION_SCHEMAS.PASSWORD,
});

module.exports = {
  accessValidation,
  registerSchemaValidation,
  loginSchemaValidation,
};
