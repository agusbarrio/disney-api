'use strict';

const authService = require('../services/auth');

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await authService.register({ username, password });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login({ username, password });
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
