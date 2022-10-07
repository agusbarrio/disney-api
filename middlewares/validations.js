const { validationResult } = require('express-validator');
const { CustomError, ERROR_MESSAGES } = require('../constants/errors');
const REQ_SIDES = require('../constants/reqSides');
const expressValidator = require('express-validator');

//Initial Validation
/**
 * @param {String} field Name of field to validate
 * @param {Obj} options Options object
 * @param {String} [options._in] One of 'check' | 'body' | 'cookie' | 'header' | 'param' | 'query'. Default 'check'
 * @param {Boolean} [options.required] true | false. Default: false
 * @returns {Function} Validation middleware
 */
module.exports.initialValidation = (
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
  return validatedField;
};

module.exports.createSchemaValidationMiddleware = function (schema) {
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
