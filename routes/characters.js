'use strict';
const express = require('express');
const charactersRouter = express.Router();
const charactersController = require('../controllers/characters');
const authMiddleware = require('../middlewares/auth');

charactersRouter.get(
  '/',
  authMiddleware.accessValidation,
  charactersController.getAll
);

module.exports = charactersRouter;
