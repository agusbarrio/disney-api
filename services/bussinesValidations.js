const usersRepository = require('../repositories/users');
const charactersRepository = require('../repositories/characters');

const { ERRORS } = require('../constants/errors');
const bussinesValidations = {
  validTargetMovies: async ({ moviesIds, userId }) => {
    if (moviesIds.length > 0) {
      const user = await usersRepository.getById(userId);
      const movies = await user.getMovies();
      const userMoviesIds = movies.map((movie) => movie.id);
      if (moviesIds.some((id) => !userMoviesIds.includes(id)))
        throw ERRORS.INVALID_TARGET_TEAMS;
    }
  },
};

module.exports = bussinesValidations;
