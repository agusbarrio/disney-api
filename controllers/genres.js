'use strict';

const genresService = require('../services/genres');

const genresController = {
  getAllByUser: async (req, res, next) => {
    try {
      const genres = await genresService.getAllByUser({
        userId: req.userId,
      });
      res.json(genres);
    } catch (error) {
      next(error);
    }
  },

  getOneByUser: async (req, res, next) => {
    try {
      const genre = await genresService.getOneByUser({
        id: req.params.id,
        userId: req.userId,
      });
      res.json(genre);
    } catch (error) {
      next(error);
    }
  },

  createByUser: async (req, res, next) => {
    try {
      const { name, image, moviesIds } = req.body;
      const newGenre = await genresService.createByUser({
        userId: req.userId,
        newItem: {
          image,
          name,
          moviesIds,
        },
      });
      res.json(newGenre);
    } catch (error) {
      next(error);
    }
  },

  editByUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { image, name, moviesIds } = req.body;
      const editedGenre = await genresService.editByUser({
        id: id,
        userId: req.userId,
        newItem: {
          image,
          name,
          moviesIds,
        },
      });
      res.json(editedGenre);
    } catch (error) {
      next(error);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const count = await genresService.deleteOneByUser({
        id: req.params.id,
        userId: req.userId,
      });
      res.json(count);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = genresController;
