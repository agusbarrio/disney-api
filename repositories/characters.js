'use strict';

const { db } = require('../models');

const charactersRepository = {
  getAllByUserId: async (userId) => {
    const characters = await db.Character.findAll({
      where: { userId },
      attributes: ['image', 'name'],
    });
    return characters;
  },

  getOneByUserId: async ({ id, userId }) => {
    const character = await db.Character.findOne({
      where: { id, userId },
    });
    return character;
  },

  findOrCreateByUserId: async ({ userId, newItem }) => {
    const [newCharacter, created] = await db.Character.findOrCreate({
      where: { name: newItem.name, userId: userId },
      defaults: { ...newItem },
    });
    return [newCharacter, created];
  },

  editOneByUserId: async ({ id, userId, newItem }) => {
    const character = await db.Character.findOne({ where: { id, userId } });
    await character.update(newItem);
    return character;
  },

  getByNameByUserId: async ({ name, userId }) => {
    const character = await db.Character.findOne({ where: { name, userId } });
    return character;
  },

  deleteByUserId: async ({ ids, userId }) => {
    const count = await db.Character.destroy({ where: { id: ids, userId } });
    return count;
  },
};

module.exports = charactersRepository;
