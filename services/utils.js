const { validationResult } = require('express-validator');
const { CustomError, ERROR_MESSAGES } = require('../constants/errors');
const REQ_SIDES = require('../constants/reqSides');
const expressValidator = require('express-validator');

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

const validationMiddleware = (validationFunction) => {
  /**
   * @param {String} field Name of field to validate
   * @param {Obj} options Options object
   * @param {String} [options._in] One of 'check' | 'body' | 'cookie' | 'header' | 'param' | 'query'. Default 'check'
   * @param {Boolean} [options.required] true | false. Default: false
   * @returns {Function} Validation middleware
   */
  const fullValidation = (
    field,
    options = { _in: REQ_SIDES.ALL, required: false }
  ) => {
    if (!Object.values(REQ_SIDES).includes(options._in))
      options._in = REQ_SIDES.ALL;
    let validatedField = expressValidator[options._in](field);
    if (options.required) {
      validatedField = validatedField
        .notEmpty()
        .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(field, options._in));
    } else {
      validatedField = validatedField.optional();
    }
    return validationFunction(validatedField);
  };
  return fullValidation;
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
  validationMiddleware,
  twoDecimalRound,
  convertToString,
  isArrayOfIds,
};
