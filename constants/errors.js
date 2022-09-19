class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  EMAIL_NOT_AVAIBLE: new CustomError(400, 'This email is not available'),
  INVALID_CREDENCIALS: new CustomError(403, 'Email or password invalid'),
  UNAUTHORIZED_ACCESS: new CustomError(401, 'Unauthorized Access'),
  INVALID_EMAIL: new CustomError(400, 'Invalid email'),
  INVALID_PASSWORD: new CustomError(
    400,
    'Invalid password. The password must be at least 6 characters'
  ),
};
