'use strict';
const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/movies');
const authMiddleware = require('../middlewares/auth');
const moviesMiddleware = require('../middlewares/movies');

moviesRouter.get(
  '/',
  authMiddleware.accessValidation,
  moviesMiddleware.getAll,
  moviesController.getAllByUser
);

moviesRouter.get(
  '/:id',
  authMiddleware.accessValidation,
  moviesMiddleware.getOne,
  moviesController.getOneByUser
);

moviesRouter.put(
  '/:id',
  authMiddleware.accessValidation,
  moviesMiddleware.edit,
  moviesController.editByUser
);

moviesRouter.post(
  '/',
  authMiddleware.accessValidation,
  moviesMiddleware.create,
  moviesController.createByUser
);

moviesRouter.delete(
  '/:id',
  authMiddleware.accessValidation,
  moviesMiddleware.deleteOne,
  moviesController.deleteOne
);
module.exports = moviesRouter;
