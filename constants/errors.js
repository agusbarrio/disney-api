const REQ_SIDES = require('./reqSides');
const _ = require('lodash');
const { minMaxString } = require('../services/utils');
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const ERRORS = {
  EMAIL_NOT_AVAIBLE: new CustomError(400, 'This email is not available'),
  UNAUTHORIZED: new CustomError(401, 'Unauthorized Access'),
  FORBIDDEN: new CustomError(403, 'Forbidden'),
  CHARACTER_NAME_NOT_AVAIBLE: new CustomError(
    400,
    'This character name is not avaible'
  ),
  RESOURCE_NOT_FOUND: new CustomError(400, 'Resource not found'),
  INVALID_TARGET_TEAMS: new CustomError(
    403,
    'Invalid target teams. You must choose only your teams'
  ),
};

//This error messages will be used in schema validations. status always are 422
const ERROR_MESSAGES = {
  FIELD_REQUIRED: (field, _in) =>
    `Field '${field}' is required in req${
      _in !== REQ_SIDES.ALL ? ' ' + _in : ''
    }`,
  INVALID_EMAIL_FIELD: (field) =>
    `Field '${field}' must be a valid email. Ej:name@mail.com`,
  INVALID_LENGTH_FIELD: (field, { min, max }) =>
    `Invalid length of field '${field}'. ${minMaxString({ min, max })}.`,
  INVALID_URL_FIELD: (field) => `Field '${field}' must be a valid URL.`,
  INVALID_ALPHA: (field) => `Field '${field}'  must only contain letters.`,
  INVALID_RANGE_FLOAT_FIELD: (field, { min, max }) =>
    `Field '${field}' must be a float number. ${minMaxString({ min, max })}.`,
  INVALID_DATE_FIELD: (field) =>
    `Field '${field}' must be a valid date with format YYYY-MM-DD`,
  INVALID_RANGE_INT_FIELD: (field, { min, max }) =>
    `Field '${field}' must be an integer number. ${minMaxString({
      min,
      max,
    })}.`,
  INVALID_ARRAY: (field, { min, max }) =>
    `Field '${field} must be an array. ${minMaxString({ min, max })}.`,
  ONLY_INTS: (field, { min, max }) =>
    `Field ${field} must only contain integers. ${minMaxString({ min, max })}.`,
};
module.exports = { ERRORS, ERROR_MESSAGES, CustomError };
