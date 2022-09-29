'use strict';

const { Character } = require('../models');

const charactersRepository = {
  getAll: async () => {
    const characters = await Character.findAll({
      attributes: ['image', 'name'],
    });
    return characters;
  },

  getById: async (id) => {
    const character = await Character.findByPk(id);
    return character;
  },

  findOrCreate: async (newItem) => {
    const [newCharacter, created] = await Character.findOrCreate({
      where: { name: newItem.name },
      defaults: { ...newItem },
    });
    return [newCharacter, created];
  },

  edit: async (id, newItem) => {
    const character = await Character.findByPk(id);
    await character.update(newItem);
    return character;
  },

  getByName: async (name) => {
    const character = await Character.findOne({ where: { name } });
    return character;
  },

  delete: async (ids) => {
    const count = await Character.destroy({ where: { id: ids } });
    return count;
  },
};

module.exports = charactersRepository;
