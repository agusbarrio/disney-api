'use strict';
const usersRepository = require('../repositories/users');
const { ERRORS } = require('../constants/errors');
const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const getEncryptedPassword = (password) =>
  password ? createHash('sha256').update(password).digest('base64') : undefined;

const comparePassword = (passwordPlain, hashPassword) => {
  return getEncryptedPassword(passwordPlain) === hashPassword;
};

const register = async ({ email, password }) => {
  const encriptedPassword = getEncryptedPassword(password);
  const [user, created] = await usersRepository.findOrCreate({
    email,
    password: encriptedPassword,
  });
  if (!created) throw ERRORS.EMAIL_NOT_AVAIBLE;
  return user;
};

const login = async ({ email, password }) => {
  const user = await usersRepository.getByEmail(email);
  if (!user) throw ERRORS.UNAUTHORIZED;
  const isValidPassword = comparePassword(password, user.password);
  if (!isValidPassword) throw ERRORS.UNAUTHORIZED;
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const validToken = async (token) => {
  if (!token) throw ERRORS.UNAUTHORIZED;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw ERRORS.UNAUTHORIZED;
  }
  const user = await usersRepository.getById(decodedToken.id);
  if (!user) throw ERRORS.UNAUTHORIZED;
  return user.id;
};

module.exports = {
  register,
  login,
  validToken,
};
