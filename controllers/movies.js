'use strict';

const moviesService = require('../services/movies');

const moviesController = {
  getAllByUser: async (req, res, next) => {
    try {
      const { title, order, genresIds } = req.query;
      const movies = await moviesService.getAllByUser({
        userId: req.userId,
        filters: { title, genresIds },
        order,
      });
      res.json(movies);
    } catch (error) {
      next(error);
    }
  },

  getOneByUser: async (req, res, next) => {
    try {
      const movie = await moviesService.getOneByUser({
        id: req.params.id,
        userId: req.userId,
      });
      res.json(movie);
    } catch (error) {
      next(error);
    }
  },

  createByUser: async (req, res, next) => {
    try {
      const { image, title, creationDate, score, charactersIds, genresIds } =
        req.body;
      const newMovie = await moviesService.createByUser({
        userId: req.userId,
        newItem: {
          image,
          title,
          creationDate,
          score,
          charactersIds,
          genresIds,
        },
      });
      res.json(newMovie);
    } catch (error) {
      next(error);
    }
  },

  editByUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { image, title, creationDate, score, charactersIds, genresIds } =
        req.body;
      const editedMovie = await moviesService.editByUser({
        id: id,
        userId: req.userId,
        newItem: {
          image,
          title,
          creationDate,
          score,
          charactersIds,
          genresIds,
        },
      });
      res.json(editedMovie);
    } catch (error) {
      next(error);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const count = await moviesService.deleteOneByUser({
        id: req.params.id,
        userId: req.userId,
      });
      res.json(count);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = moviesController;
