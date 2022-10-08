'use strict';
const charactersRepository = require('../repositories/characters');
const { ERRORS } = require('../constants/errors');

const charactersService = {
  getAllByUser: async ({ userId }) => {
    const characters = await charactersRepository.getAllByUserId(userId);
    return characters;
  },

  getOneByUser: async ({ id, userId }) => {
    const character = await charactersRepository.getOneByUserId({ id, userId });
    if (!character) throw ERRORS.RESOURCE_NOT_FOUND;
    return character;
  },

  createByUser: async ({ userId, newItem }) => {
    //TODO validar que los programsIds referencien programas de este usuario
    const [newCharacter, created] =
      await charactersRepository.findOrCreateByUserId({ userId, newItem });
    if (!created) throw ERRORS.CHARACTER_NAME_NOT_AVAIBLE;
    return newCharacter;
  },

  editByUser: async ({ id, userId, newItem }) => {
    const existentCharacter = await charactersRepository.getByNameByUserId({
      name: newItem.name,
      userId,
    });
    if (existentCharacter && existentCharacter.id !== id)
      throw ERRORS.CHARACTER_NAME_NOT_AVAIBLE;
    if (!!existentCharacter) throw ERRORS.RESOURCE_NOT_FOUND;
    const editedCharacter = await charactersRepository.editOneByUserId(
      id,
      newItem
    );
    //TODO validar que los programsIds referencien programas de este usuario
    return editedCharacter;
  },

  deleteOneByUser: async ({ id, userId }) => {
    const count = await charactersRepository.deleteByUserId({
      ids: [id],
      userId,
    });
    if (count === 0) throw ERRORS.RESOURCE_NOT_FOUND;
    return count;
  },
};

module.exports = charactersService;
