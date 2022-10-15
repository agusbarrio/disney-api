'use strict';
const express = require('express');
const genresRouter = express.Router();
const genresController = require('../controllers/genres');
const authMiddleware = require('../middlewares/auth');
const genresMiddleware = require('../middlewares/genres');

genresRouter.get(
  '/',
  authMiddleware.accessValidation,
  genresController.getAllByUser
);

genresRouter.get(
  '/:id',
  authMiddleware.accessValidation,
  genresMiddleware.getOne,
  genresController.getOneByUser
);

genresRouter.put(
  '/:id',
  authMiddleware.accessValidation,
  genresMiddleware.edit,
  genresController.editByUser
);

genresRouter.post(
  '/',
  authMiddleware.accessValidation,
  genresMiddleware.create,
  genresController.createByUser
);

genresRouter.delete(
  '/:id',
  authMiddleware.accessValidation,
  genresMiddleware.deleteOne,
  genresController.deleteOne
);
module.exports = genresRouter;
