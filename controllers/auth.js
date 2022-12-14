'use strict';

const authService = require('../services/auth');
const emailNotificationsService = require('../services/emailNotifications');
const EMAIL_TEMPLATES = require('../constants/emailTemplates');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await authService.register({ email, password });
    emailNotificationsService.sendMail(EMAIL_TEMPLATES.REGISTER, email);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login({ email, password });
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.clearCookie('token');
  res.json(true);
};

module.exports = { register, login, logout };
