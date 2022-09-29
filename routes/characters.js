'use strict';
const express = require('express');
const charactersRouter = express.Router();
const charactersController = require('../controllers/characters');
const authMiddleware = require('../middlewares/auth');
const charactersMiddleware = require('../middlewares/characters');

charactersRouter.get(
  '/',
  authMiddleware.accessValidation,
  charactersController.getAll
);

charactersRouter.get(
  '/:id',
  authMiddleware.accessValidation,
  charactersMiddleware.getOne,
  charactersController.getOne
);

charactersRouter.put(
  '/:id',
  authMiddleware.accessValidation,
  charactersMiddleware.edit,
  charactersController.edit
);

charactersRouter.post(
  '/',
  authMiddleware.accessValidation,
  charactersMiddleware.create,
  charactersController.create
);

charactersRouter.delete(
  '/:id',
  authMiddleware.accessValidation,
  charactersMiddleware.deleteOne,
  charactersController.deleteOne
);
module.exports = charactersRouter;
