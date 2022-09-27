const { validationResult } = require('express-validator');
const { CustomError } = require('../constants/errors');
const createSchemaValidationMiddleware = function (schema) {
  return [
    ...schema,
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

const twoDecimalRound = (v) =>
  Math.round((Number(v) + Number.EPSILON) * 100) / 100;

const convertToString = (v) => `${v}`;

const isArray = (arr) => arr instanceof Array;

const isArrayOfIds = (arr) => {
  if (isArray(arr)) return false;
  return !arr.some((el) => typeof el !== 'number' || el <= 0);
};

module.exports = {
  createSchemaValidationMiddleware,
  twoDecimalRound,
  convertToString,
  isArrayOfIds,
};
