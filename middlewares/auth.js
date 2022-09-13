'use strict';

const authService = require('../services/auth');

const accessValidation = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userId = await authService.validToken(token);
    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { accessValidation };
