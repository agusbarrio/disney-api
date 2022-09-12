class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  USERNAME_NOT_AVAIBLE: new CustomError(400, 'this username is not available'),
  INVALID_CREDENCIALS: new CustomError(403, 'username or password invalid'),
};
