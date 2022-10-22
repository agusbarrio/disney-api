'use strict';

const { db } = require('../models');
const { Op } = require('Sequelize');

const charactersRepository = {
  getAllByUserId: async (userId, filters = {}) => {
    let where = { userId };
    if (filters.name) where.name = { [Op.substring]: filters.name };
    if (filters.age) where.age = filters.age;
    let include = {};
    if (filters.moviesIds) {
      include = [
        {
          model: db.Movie,
          as: 'movies',
          attributes: ['id'],
          where: {
            //TODO ver como filtrar los personajes que contengan todos los moviesIds
            id: filters.moviesIds,
          },
        },
      ];
    }

    const characters = await db.Character.findAll({
      where,
      attributes: ['image', 'name'],
      include,
    });
    return characters;
  },

  getByIdByUserId: async ({ id, userId }) => {
    const character = await db.Character.findOne({
      where: { id, userId },
    });
    return character;
  },

  createOne: async (newItem) => {
    const newCharacter = await db.Character.create({ ...newItem });
    if (newItem.moviesIds) await newCharacter.setMovies(newItem.moviesIds);
    return newCharacter;
  },

  editById: async ({ id, newItem }) => {
    const character = await db.Character.findByPk(id);
    if (!character) return null;
    await character.update(newItem);
    if (newItem.moviesIds) await character.setMovies(newItem.moviesIds);
    return character;
  },

  getByNameByUserId: async ({ name, userId }) => {
    const character = await db.Character.findOne({ where: { name, userId } });
    return character;
  },

  deleteByIdsByUserId: async ({ ids, userId }) => {
    const count = await db.Character.destroy({ where: { id: ids, userId } });
    return count;
  },
};

module.exports = charactersRepository;
