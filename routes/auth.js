'use strict';
const express = require('express');

const authRouter = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
authRouter.post(
  '/register',
  authMiddleware.registerSchemaValidation,
  authController.register
);
authRouter.get(
  '/login',
  authMiddleware.loginSchemaValidation,
  authController.login
);
authRouter.get('/logout', authController.logout);
module.exports = authRouter;
