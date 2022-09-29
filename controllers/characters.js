'use strict';

const charactersService = require('../services/characters');

const charactersController = {
  getAll: async (req, res, next) => {
    try {
      const characters = await charactersService.getAll();
      res.json(characters);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const character = await charactersService.getById(req.params.id);
      res.json(character);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { image, name, age, weight, story } = req.body;
      const newCharacter = await charactersService.create({
        image,
        name,
        age,
        weight,
        story,
      });
      res.json(newCharacter);
    } catch (error) {
      next(error);
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { image, name, age, weight, story } = req.body;
      const editedCharacter = await charactersService.edit(id, {
        image,
        name,
        age,
        weight,
        story,
      });
      res.json(editedCharacter);
    } catch (error) {
      next(error);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const count = await charactersService.deleteOne(req.params.id);
      res.json(count);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = charactersController;
