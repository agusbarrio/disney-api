'use strict';
const { createSchemaValidationMiddleware } = require('./validations');
const validate = require('../constants/validationSchemas');
const authService = require('../services/auth');
const { BODY } = require('../constants/reqSides');

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

const registerSchemaValidation = createSchemaValidationMiddleware([
  validate.email('email', { _in: BODY, required: true }),
  validate.password('password', { _in: BODY, required: true }),
]);

const loginSchemaValidation = createSchemaValidationMiddleware([
  validate.email('email', { _in: BODY, required: true }),
  /* En la validacion de la contraseña del login no se usa password para que si  cambia el esquema de contraseña valido, se puedan loguear registrados con el viejo esquema */
  validate.text('password', { _in: BODY, required: true }),
]);

module.exports = {
  accessValidation,
  registerSchemaValidation,
  loginSchemaValidation,
};
