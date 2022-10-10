'use strict';
const charactersRepository = require('../repositories/characters');
const { ERRORS } = require('../constants/errors');
const bussinesValidations = require('./bussinesValidations');

const charactersService = {
  getAllByUser: async ({ userId }) => {
    const characters = await charactersRepository.getAllByUserId(userId);
    return characters;
  },

  getOneByUser: async ({ id, userId }) => {
    const character = await charactersRepository.getByIdByUserId({
      id,
      userId,
    });
    if (!character) throw ERRORS.RESOURCE_NOT_FOUND;
    return character;
  },

  createByUser: async ({ userId, newItem }) => {
    if (newItem?.moviesIds?.length > 0) {
      await bussinesValidations.validTargetMovies({
        moviesIds: newItem.moviesIds,
        userId,
      });
    }

    const existentCharacter = await charactersRepository.getByNameByUserId({
      name: newItem.name,
      userId,
    });
    if (existentCharacter) throw ERRORS.CHARACTER_NAME_NOT_AVAIBLE;
    const newCharacter = await charactersRepository.createOne({
      userId,
      ...newItem,
    });
    return newCharacter;
  },

  editByUser: async ({ id, userId, newItem }) => {
    if (newItem?.moviesIds?.length > 0) {
      await bussinesValidations.validTargetMovies({
        moviesIds: newItem.moviesIds,
        userId,
      });
    }
    if (newItem?.name) {
      const existentCharacter = await charactersRepository.getByNameByUserId({
        name: newItem.name,
        userId,
      });

      if (existentCharacter && existentCharacter.id !== id)
        throw ERRORS.CHARACTER_NAME_NOT_AVAIBLE;

      if (!existentCharacter || existentCharacter.id === id) {
        const editedCharacter = await charactersRepository.editById({
          id,
          newItem,
        });
        if (!editedCharacter) throw ERRORS.RESOURCE_NOT_FOUND;
        return editedCharacter;
      }
    } else {
      const editedCharacter = await charactersRepository.editById({
        id,
        newItem,
      });
      return editedCharacter;
    }
  },

  deleteOneByUser: async ({ id, userId }) => {
    const count = await charactersRepository.deleteByIdsByUserId({
      ids: [id],
      userId,
    });
    if (count === 0) throw ERRORS.RESOURCE_NOT_FOUND;
    return count;
  },
};

module.exports = charactersService;
