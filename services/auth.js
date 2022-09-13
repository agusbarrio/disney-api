'use strict';
const usersRepository = require('../repositories/users');
const ERRORS = require('../constants/errors');
const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const getEncryptedPassword = (password) =>
  password ? createHash('sha256').update(password).digest('base64') : undefined;

const comparePassword = (passwordPlain, hashPassword) => {
  return getEncryptedPassword(passwordPlain) === hashPassword;
};

const register = async ({ username, password }) => {
  try {
    const encriptedPassword = getEncryptedPassword(password);
    const newUser = await usersRepository.create({
      username,
      password: encriptedPassword,
    });
    return newUser;
  } catch (error) {
    throw ERRORS.USERNAME_NOT_AVAIBLE;
  }
};

const login = async ({ username, password }) => {
  const user = await usersRepository.getByUsername(username);
  if (!user) throw ERRORS.INVALID_CREDENCIALS;
  const isValidPassword = comparePassword(password, user.password);
  if (!isValidPassword) throw ERRORS.INVALID_CREDENCIALS;
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const validToken = async (token) => {
  if (!token) throw ERRORS.UNAUTHORIZED_ACCESS;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw ERRORS.UNAUTHORIZED_ACCESS;
  }
  const user = await usersRepository.getById(decodedToken.id);
  if (!user) throw ERRORS.UNAUTHORIZED_ACCESS;
  return user.id;
};

module.exports = {
  register,
  login,
  validToken,
};
