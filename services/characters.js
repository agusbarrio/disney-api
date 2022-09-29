'use strict';
const charactersRepository = require('../repositories/characters');
const { ERRORS } = require('../constants/errors');

const charactersService = {
  getAll: async () => {
    const characters = await charactersRepository.getAll();
    return characters;
  },

  getById: async (id) => {
    const character = await charactersRepository.getById(id);
    return character;
  },

  create: async (newItem) => {
    const [newCharacter, created] = await charactersRepository.findOrCreate(
      newItem
    );
    if (!created) throw ERRORS.CHARACTER_NAME_NOT_AVAIBLE;
    return newCharacter;
  },

  edit: async (id, newItem) => {
    const existentCharacter = await charactersRepository.getByName(
      newItem.name
    );
    if (existentCharacter && existentCharacter.id !== id)
      throw ERRORS.CHARACTER_NAME_NOT_AVAIBLE;

    const editedCharacter = await charactersRepository.edit(id, newItem);
    return editedCharacter;
  },

  deleteOne: async (id) => {
    const count = await charactersRepository.delete([id]);
    if (count === 0) throw ERRORS.RESOURCE_NOT_FOUND;
    return count;
  },
};

module.exports = charactersService;
