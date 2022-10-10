'use strict';

const { db } = require('../models');

const moviesRepository = {
  getAllByUserId: async (userId) => {
    const movies = await db.Movie.findAll({
      where: { userId },
      attributes: ['image', 'title'],
    });
    return movies;
  },

  getByIdByUserId: async ({ id, userId }) => {
    const movie = await db.Movie.findOne({
      where: { id, userId },
    });
    return movie;
  },

  createOne: async (newItem) => {
    const newMovie = await db.Movie.create({ ...newItem });
    if (newItem.charactersIds)
      await newMovie.setCharacters(newItem.charactersIds);
    if (newItem.genresIds) await newMovie.setGenres(newItem.genresIds);
    return newMovie;
  },
  editById: async ({ id, newItem }) => {
    const movie = await db.Movie.findByPk(id);
    if (!movie) return null;
    await movie.update(newItem);
    if (newItem.charactersIds) await movie.setCharacters(newItem.charactersIds);
    if (newItem.genresIds) await movie.setGenres(newItem.genresIds);
    return movie;
  },

  getByTitleByUserId: async ({ title, userId }) => {
    const movie = await db.Movie.findOne({ where: { title, userId } });
    return movie;
  },

  deleteByIdsByUserId: async ({ ids, userId }) => {
    const count = await db.Movie.destroy({ where: { id: ids, userId } });
    return count;
  },
};

module.exports = moviesRepository;
