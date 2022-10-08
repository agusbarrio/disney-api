'use strict';
const express = require('express');
const charactersRouter = express.Router();
const charactersController = require('../controllers/characters');
const authMiddleware = require('../middlewares/auth');
const charactersMiddleware = require('../middlewares/characters');

charactersRouter.get(
  '/',
  authMiddleware.accessValidation,
  charactersController.getAllByUser
);

charactersRouter.get(
  '/:id',
  authMiddleware.accessValidation,
  charactersMiddleware.getOne,
  charactersController.getOneByUser
);

charactersRouter.put(
  '/:id',
  authMiddleware.accessValidation,
  charactersMiddleware.edit,
  charactersController.editByUser
);

charactersRouter.post(
  '/',
  authMiddleware.accessValidation,
  charactersMiddleware.create,
  charactersController.createByUser
);

charactersRouter.delete(
  '/:id',
  authMiddleware.accessValidation,
  charactersMiddleware.deleteOne,
  charactersController.deleteOne
);
module.exports = charactersRouter;
