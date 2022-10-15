'use strict';
const usersRepository = require('../repositories/users');

const { ERRORS } = require('../constants/errors');
const bussinesValidations = {
  validTargetMovies: async ({ moviesIds, userId }) => {
    if (moviesIds.length > 0) {
      const user = await usersRepository.getById(userId);
      const movies = await user.getMovies();
      const userMoviesIds = movies.map((movie) => movie.id);
      if (moviesIds.some((id) => !userMoviesIds.includes(id)))
        throw ERRORS.INVALID_TARGET_MOVIES;
    }
  },
  validTargetCharacters: async ({ charactersIds, userId }) => {
    if (charactersIds.length > 0) {
      const user = await usersRepository.getById(userId);
      const characters = await user.getCharacters();
      const userCharactersIds = characters.map((character) => character.id);
      if (charactersIds.some((id) => !userCharactersIds.includes(id)))
        throw ERRORS.INVALID_TARGET_CHARACTERS;
    }
  },
  validTargetGenres: async ({ genresIds, userId }) => {
    if (genresIds.length > 0) {
      const user = await usersRepository.getById(userId);
      const genres = await user.getGenres();
      const userGenresIds = genres.map((genre) => genre.id);
      if (genresIds.some((id) => !userGenresIds.includes(id)))
        throw ERRORS.INVALID_TARGET_GENRES;
    }
  },
};

module.exports = bussinesValidations;
