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
};

//This error messages will be used in schema validations. status always are 422
const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  INVALID_EMAIL: 'Invalid email. Ej:name@mail.com',
  INVALID_PASSWORD:
    'Invalid password. The password must be between 7 and 50 characters',
  PASSWORD_REQUIRED: 'Password is required',
};
module.exports = { ERRORS, ERROR_MESSAGES, CustomError };
