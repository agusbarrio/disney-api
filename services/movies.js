'use strict';
const moviesRepository = require('../repositories/movies');
const { ERRORS } = require('../constants/errors');
const bussinesValidations = require('./bussinesValidations');

const moviesService = {
  getAllByUser: async ({ userId, filters, order }) => {
    if (filters?.genresIds) {
      await bussinesValidations.validTargetGenres({
        genresIds: filters.genresIds,
        userId,
      });
    }
    const movies = await moviesRepository.getAllByUserId(
      userId,
      filters,
      order
    );
    const result = movies.map((movie) => ({
      title: movie.title,
      image: movie.image,
      id: movie.id,
    }));
    return result;
  },

  getOneByUser: async ({ id, userId }) => {
    const movies = await moviesRepository.getByIdByUserId({
      id,
      userId,
    });
    if (!movies) throw ERRORS.NOT_FOUND;
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
    if (existentMovie) throw ERRORS.FIELD_NOT_AVAIBLE('title');
    const newMovie = await moviesRepository.createOne({
      userId,
      ...newItem,
    });
    delete newMovie.dataValues.userId;
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
        throw ERRORS.FIELD_NOT_AVAIBLE('title');
    }
    const editedMovie = await moviesRepository.editByIdByUserId({
      id,
      newItem,
      userId,
    });
    if (!editedMovie) throw ERRORS.NOT_FOUND;
    return editedMovie;
  },

  deleteOneByUser: async ({ id, userId }) => {
    const count = await moviesRepository.deleteByIdsByUserId({
      ids: [id],
      userId,
    });
    if (count === 0) throw ERRORS.NOT_FOUND;
    return count;
  },
};

module.exports = moviesService;
