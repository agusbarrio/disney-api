'use strict';
const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');

authRouter.post('/register', authController.register);
authRouter.get('/login', authController.login);
authRouter.get('/logout', authController.logout);
module.exports = authRouter;
