'use strict';

const { db } = require('../models');

const genresRepository = {
  getAllByUserId: async (userId) => {
    const genres = await db.Genre.findAll({
      where: { userId },
      attributes: ['image', 'name'],
    });
    return genres;
  },

  getByIdByUserId: async ({ id, userId }) => {
    const genre = await db.Genre.findOne({
      where: { id, userId },
      attributes: { exclude: ['userId'] },
    });
    return genre;
  },

  createOne: async (newItem) => {
    const newGenre = await db.Genre.create({ ...newItem });
    return newGenre;
  },

  editById: async ({ id, newItem }) => {
    const genre = await db.Genre.findByPk(id, {
      attributes: { exclude: ['userId'] },
    });
    if (!genre) return null;
    await genre.update(newItem);
    return genre;
  },

  getByNameByUserId: async ({ name, userId }) => {
    const genre = await db.Genre.findOne({ where: { name, userId } });
    return genre;
  },

  deleteByIdsByUserId: async ({ ids, userId }) => {
    const count = await db.Genre.destroy({ where: { id: ids, userId } });
    return count;
  },
};

module.exports = genresRepository;
