'use strict';
const genresRepository = require('../repositories/genres');
const { ERRORS } = require('../constants/errors');
const bussinesValidations = require('./bussinesValidations');

const genresService = {
  getAllByUser: async ({ userId }) => {
    const genres = await genresRepository.getAllByUserId(userId);
    return genres;
  },

  getOneByUser: async ({ id, userId }) => {
    const genres = await genresRepository.getByIdByUserId({
      id,
      userId,
    });
    if (!genres) throw ERRORS.RESOURCE_NOT_FOUND;
    return genres;
  },

  createByUser: async ({ userId, newItem }) => {
    const existentGenre = await genresRepository.getByNameByUserId({
      name: newItem.name,
      userId,
    });
    if (existentGenre) throw ERRORS.GENRE_NAME_NOT_AVAIBLE;
    const newGenre = await genresRepository.createOne({
      userId,
      ...newItem,
    });
    return newGenre;
  },

  editByUser: async ({ id, userId, newItem }) => {
    if (newItem?.name) {
      const existentGenre = await genresRepository.getByNameByUserId({
        name: newItem.name,
        userId,
      });

      if (existentGenre && existentGenre.id !== id)
        throw ERRORS.CHARACTER_NAME_NOT_AVAIBLE;

      if (!existentGenre || existentGenre.id === id) {
        const editedGenre = await genresRepository.editById({
          id,
          newItem,
        });
        if (!editedGenre) throw ERRORS.RESOURCE_NOT_FOUND;
        return editedGenre;
      }
    } else {
      const editedGenre = await genresRepository.editById({
        id,
        newItem,
      });
      return editedGenre;
    }
  },

  deleteOneByUser: async ({ id, userId }) => {
    const count = await genresRepository.deleteByIdsByUserId({
      ids: [id],
      userId,
    });
    if (count === 0) throw ERRORS.RESOURCE_NOT_FOUND;
    return count;
  },
};

module.exports = genresService;
