'use strict';
const charactersRepository = require('../repositories/characters');
const { ERRORS } = require('../constants/errors');
const bussinesValidations = require('./bussinesValidations');

const charactersService = {
  getAllByUser: async ({ userId, filters }) => {
    if (filters?.moviesIds) {
      await bussinesValidations.validTargetMovies({
        moviesIds: filters.moviesIds,
        userId,
      });
    }
    const characters = await charactersRepository.getAllByUserId(
      userId,
      filters
    );
    const result = characters.map((character) => ({
      name: character.name,
      image: character.image,
      id: character.id,
    }));
    return result;
  },

  getOneByUser: async ({ id, userId }) => {
    const character = await charactersRepository.getByIdByUserId({
      id,
      userId,
    });
    if (!character) throw ERRORS.NOT_FOUND;
    return character;
  },

  createByUser: async ({ userId, newItem }) => {
    const existentCharacter = await charactersRepository.getByNameByUserId({
      name: newItem.name,
      userId,
    });
    if (existentCharacter) throw ERRORS.FIELD_NOT_AVAIBLE('name');

    if (newItem?.moviesIds?.length > 0) {
      await bussinesValidations.validTargetMovies({
        moviesIds: newItem.moviesIds,
        userId,
      });
    }

    const newCharacter = await charactersRepository.createOne({
      userId,
      ...newItem,
    });
    delete newCharacter.dataValues.userId;
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
        throw ERRORS.FIELD_NOT_AVAIBLE('name');

      if (!existentCharacter || existentCharacter.id === id) {
        const editedCharacter = await charactersRepository.editById({
          id,
          newItem,
        });
        if (!editedCharacter) throw ERRORS.NOT_FOUND;
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
    if (count === 0) throw ERRORS.NOT_FOUND;
    return count;
  },
};

module.exports = charactersService;
