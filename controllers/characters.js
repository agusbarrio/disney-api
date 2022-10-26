'use strict';

const charactersService = require('../services/characters');

const charactersController = {
  getAllByUser: async (req, res, next) => {
    try {
      const { name, age, moviesIds } = req.query;
      const characters = await charactersService.getAllByUser({
        userId: req.userId,
        filters: { name, age, moviesIds },
      });
      res.json(characters);
    } catch (error) {
      next(error);
    }
  },

  getOneByUser: async (req, res, next) => {
    try {
      const character = await charactersService.getOneByUser({
        id: req.params.id,
        userId: req.userId,
      });
      res.json(character);
    } catch (error) {
      next(error);
    }
  },

  createByUser: async (req, res, next) => {
    try {
      const { image, name, age, weight, story, moviesIds } = req.body;
      const newCharacter = await charactersService.createByUser({
        userId: req.userId,
        newItem: {
          image,
          name,
          age,
          weight,
          story,
          moviesIds,
        },
      });
      res.json(newCharacter);
    } catch (error) {
      next(error);
    }
  },

  editByUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { image, name, age, weight, story, moviesIds } = req.body;
      const editedCharacter = await charactersService.editByUser({
        id: id,
        userId: req.userId,
        newItem: {
          image,
          name,
          age,
          weight,
          story,
          moviesIds,
        },
      });
      res.json(editedCharacter);
    } catch (error) {
      next(error);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const count = await charactersService.deleteOneByUser({
        id: req.params.id,
        userId: req.userId,
      });
      res.json(count);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = charactersController;
