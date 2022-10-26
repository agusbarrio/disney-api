'use strict';

const { db } = require('../models');
const sequelize = require('sequelize');

const charactersRepository = {
  getAllByUserId: async (userId, filters = {}) => {
    const searchProps = {
      where: { userId },
      attributes: ['name', 'image', 'id'],
    };
    if (filters.name)
      searchProps.where.name = { [sequelize.Op.substring]: filters.name };
    if (filters.age) searchProps.where.age = filters.age;
    if (filters.moviesIds) {
      searchProps.include = [
        {
          model: db.Movie,
          as: 'movies',
          attributes: ['id'],
          where: { id: filters.moviesIds },
        },
      ];
      searchProps.group = ['id'];
      searchProps.having = sequelize.where(
        sequelize.fn('count', '*'),
        sequelize.Op.eq,
        filters.moviesIds.length
      );
    }

    const characters = await db.Character.findAll({
      ...searchProps,
    });
    return characters;
  },

  getByIdByUserId: async ({ id, userId }) => {
    const character = await db.Character.findOne({
      where: { id, userId },
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: db.Movie,
          as: 'movies',
          through: { attributes: [] },
          attributes: { exclude: ['userId'] },
        },
      ],
    });
    return character;
  },

  createOne: async (newItem) => {
    const newCharacter = await db.Character.create({ ...newItem });
    if (newItem.moviesIds) await newCharacter.setMovies(newItem.moviesIds);
    return newCharacter;
  },

  editById: async ({ id, newItem }) => {
    const character = await db.Character.findByPk(id, {
      attributes: { exclude: ['userId'] },
    });
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
