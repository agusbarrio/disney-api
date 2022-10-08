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

  getByIdByUserId: async ({ id, userId }) => {
    const character = await db.Character.findOne({
      where: { id, userId },
    });
    return character;
  },

  createOne: async (newItem) => {
    const newCharacter = await db.Character.create({ ...newItem });
    if (newItem.programsIds) await newCharacter.setPrograms(newItem.programIds);
    return newCharacter;
  },

  editById: async ({ id, newItem }) => {
    const character = await db.Character.findByPk(id);
    if (!character) return null;
    await character.update(newItem);
    if (newItem.programsIds) await character.setPrograms(newItem.programIds);
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
