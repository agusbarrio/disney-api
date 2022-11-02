'use strict';

const { db } = require('../models');
const sequelize = require('sequelize');
const ORDERS = require('../constants/orders');
const moviesRepository = {
  getAllByUserId: async (userId, filters, order) => {
    const searchProps = {
      where: { userId },
      attributes: ['image', 'title', 'id'],
    };
    if (filters?.title)
      searchProps.where.title = { [sequelize.Op.substring]: filters.title };
    if (filters?.genresIds) {
      searchProps.include = [
        {
          model: db.Genre,
          as: 'genres',
          attributes: ['id'],
          where: { id: filters.genresIds },
        },
      ];
      searchProps.group = ['id'];
      searchProps.having = sequelize.where(
        sequelize.fn('count', '*'),
        sequelize.Op.eq,
        filters.genresIds.length
      );
    }
    if (order && Object.values(ORDERS).includes(order)) {
      searchProps.order = [['creationDate', order]];
    }

    const movies = await db.Movie.findAll({
      ...searchProps,
    });
    return movies;
  },

  getByIdByUserId: async ({ id, userId }) => {
    const movie = await db.Movie.findOne({
      where: { id, userId },
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: db.Character,
          as: 'characters',
          through: { attributes: [] },
          attributes: { exclude: ['userId'] },
        },
      ],
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
  editByIdByUserId: async ({ id, newItem, userId }) => {
    const movie = await db.Movie.findOne({
      where: { id, userId },
      attributes: { exclude: ['userId'] },
    });
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
