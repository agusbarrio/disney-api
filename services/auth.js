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

module.exports = { register, getEncryptedPassword, comparePassword, login };
