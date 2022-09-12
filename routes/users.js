'use strict';
const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users');

usersRouter.get('/', usersController.getAll);
usersRouter.delete('/:id', usersController.deleteOne);

module.exports = usersRouter;
