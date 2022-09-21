const { validationResult } = require('express-validator');
const { CustomError } = require('../constants/errors');
const createSchemaValidationMiddleware = function (schema) {
  return [
    ...Object.values(schema),
    (req, res, next) => {
      try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
          throw new CustomError(422, result.errors[0].msg);
        }
        next();
      } catch (error) {
        next(error);
      }
    },
  ];
};

module.exports = { createSchemaValidationMiddleware };
