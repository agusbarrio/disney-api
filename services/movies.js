'use strict';
const moviesRepository = require('../repositories/movies');
const { ERRORS } = require('../constants/errors');
const bussinesValidations = require('./bussinesValidations');

const moviesService = {
  getAllByUser: async ({ userId }) => {
    const movies = await moviesRepository.getAllByUserId(userId);
    return movies;
  },

  getOneByUser: async ({ id, userId }) => {
    const movies = await moviesRepository.getByIdByUserId({
      id,
      userId,
    });
    if (!movies) throw ERRORS.RESOURCE_NOT_FOUND;
    return movies;
  },

  createByUser: async ({ userId, newItem }) => {
    if (newItem?.charactersIds?.length > 0) {
      await bussinesValidations.validTargetCharacters({
        charactersIds: newItem.charactersIds,
        userId,
      });
    }
    if (newItem?.genresIds?.length > 0) {
      await bussinesValidations.validTargetGenres({
        genresIds: newItem.genresIds,
        userId,
      });
    }

    const existentMovie = await moviesRepository.getByTitleByUserId({
      title: newItem.title,
      userId,
    });
    if (existentMovie) throw ERRORS.MOVIE_TITLE_NOT_AVAIBLE;
    const newMovie = await moviesRepository.createOne({
      userId,
      ...newItem,
    });
    return newMovie;
  },

  editByUser: async ({ id, userId, newItem }) => {
    if (newItem?.charactersIds?.length > 0) {
      await bussinesValidations.validTargetCharacters({
        charactersIds: newItem.charactersIds,
        userId,
      });
    }
    if (newItem?.genresIds?.length > 0) {
      await bussinesValidations.validTargetGenres({
        genresIds: newItem.genresIds,
        userId,
      });
    }
    if (newItem?.title) {
      const existentMovie = await moviesRepository.getByTitleByUserId({
        title: newItem.title,
        userId,
      });
      if (existentMovie && existentMovie.id !== id)
        throw ERRORS.MOVIE_TITLE_NOT_AVAIBLE;

      if (!existentMovie || existentMovie.id === id) {
        const editedMovie = await moviesRepository.editById({
          id,
          newItem,
        });
        if (!editedMovie) throw ERRORS.RESOURCE_NOT_FOUND;
        return editedMovie;
      }
    } else {
      const editedMovie = await moviesRepository.editById({
        id,
        newItem,
      });
      return editedMovie;
    }
  },

  deleteOneByUser: async ({ id, userId }) => {
    const count = await moviesRepository.deleteByIdsByUserId({
      ids: [id],
      userId,
    });
    if (count === 0) throw ERRORS.RESOURCE_NOT_FOUND;
    return count;
  },
};

module.exports = moviesService;
