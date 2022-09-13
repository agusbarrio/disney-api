'use strict';
const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
usersRouter.get('/', authMiddleware.accessValidation, usersController.getAll);
usersRouter.delete('/:id', usersController.deleteOne);

module.exports = usersRouter;
