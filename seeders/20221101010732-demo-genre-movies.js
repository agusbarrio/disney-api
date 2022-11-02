'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const newGenreMovies = [
      { movieId: 1, genreId: 1 },
      { movieId: 1, genreId: 2 },
      { movieId: 2, genreId: 1 },
      { movieId: 2, genreId: 3 },
      { movieId: 3, genreId: 2 },
      { movieId: 3, genreId: 3 },
      { movieId: 4, genreId: 4 },
      { movieId: 4, genreId: 5 },
      { movieId: 5, genreId: 4 },
      { movieId: 5, genreId: 6 },
      { movieId: 6, genreId: 5 },
      { movieId: 6, genreId: 6 },
      { movieId: 7, genreId: 7 },
      { movieId: 7, genreId: 8 },
      { movieId: 8, genreId: 7 },
      { movieId: 8, genreId: 9 },
      { movieId: 9, genreId: 8 },
      { movieId: 9, genreId: 9 },
    ];
    await queryInterface.bulkInsert('genre_movies', newGenreMovies);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genre_movies', null, {});
  },
};
