'use strict';
const genresRepository = require('../repositories/genres');
const { ERRORS } = require('../constants/errors');

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
    if (!genres) throw ERRORS.NOT_FOUND;
    return genres;
  },

  createByUser: async ({ userId, newItem }) => {
    const existentGenre = await genresRepository.getByNameByUserId({
      name: newItem.name,
      userId,
    });
    if (existentGenre) throw ERRORS.FIELD_NOT_AVAIBLE('name');
    const newGenre = await genresRepository.createOne({
      userId,
      ...newItem,
    });
    delete newGenre.dataValues.userId;
    return newGenre;
  },

  editByUser: async ({ id, userId, newItem }) => {
    if (newItem?.name) {
      const existentGenre = await genresRepository.getByNameByUserId({
        name: newItem.name,
        userId,
      });

      if (existentGenre && existentGenre.id !== id)
        throw ERRORS.FIELD_NOT_AVAIBLE('name');

      if (!existentGenre || existentGenre.id === id) {
        const editedGenre = await genresRepository.editById({
          id,
          newItem,
        });
        if (!editedGenre) throw ERRORS.NOT_FOUND;
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
    if (count === 0) throw ERRORS.NOT_FOUND;
    return count;
  },
};

module.exports = genresService;
