const REQ_SIDES = require('./reqSides');
const _ = require('lodash');
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const ERRORS = {
  EMAIL_NOT_AVAIBLE: new CustomError(400, 'This email is not available'),
  INVALID_CREDENCIALS: new CustomError(403, 'Email or password invalid'),
  UNAUTHORIZED_ACCESS: new CustomError(401, 'Unauthorized Access'),
  CHARACTER_NAME_NOT_AVAIBLE: new CustomError(
    400,
    'This character name is not avaible'
  ),
  RESOURCE_NOT_FOUND: new CustomError(400, 'Resource not found'),
};

//This error messages will be used in schema validations. status always are 422
const ERROR_MESSAGES = {
  FIELD_REQUIRED: (field, _in) =>
    `Field '${field}' is required in req${
      _in !== REQ_SIDES.ALL ? ' ' + _in : ''
    }`,
  INVALID_EMAIL: 'Invalid email. Ej:name@mail.com',
  INVALID_PASSWORD:
    'Invalid password. The password must be between 7 and 50 characters.',
  INVALID_IMAGE: 'Image must be a valid URL.',
  INVALID_NAME_LENGTH: 'Name must be between 1 and 50 characters.',
  INVALID_NAME: 'Name must only contain letters.',
  INVALID_WEIGHT: 'Weight must be between 0 and 100000 kg.',
  INVALID_STORY_LENGHT: 'Story must be between 0 and 1000 characters.',
  INVALID_AGE: 'Age must be an int between 0 and 100000.',
  INVALID_TITLE_LENGTH: 'Title must be between 0 and 100 characters.',
  INVALID_CREATION_DATE:
    'Creation date must be a valid date with format YYYY-MM-DD',
  INVALID_SCORE: 'Weight must be between 0 and 5',
  INVALID_ID: 'Id must be an integer equal or greater than 1',
  INVALID_IDS: 'Ids must be an array of integers',
};
module.exports = { ERRORS, ERROR_MESSAGES, CustomError };
