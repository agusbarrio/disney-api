class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  USERNAME_NOT_AVAIBLE: new CustomError(400, 'This username is not available'),
  INVALID_CREDENCIALS: new CustomError(403, 'Username or password invalid'),
  UNAUTHORIZED_ACCESS: new CustomError(401, 'Unauthorized Access'),
};
