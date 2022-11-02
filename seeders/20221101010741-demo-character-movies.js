'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const newCharacterMovies = [
      { movieId: 1, characterId: 1 },
      { movieId: 1, characterId: 2 },
      { movieId: 2, characterId: 1 },
      { movieId: 2, characterId: 3 },
      { movieId: 3, characterId: 2 },
      { movieId: 3, characterId: 3 },
      { movieId: 4, characterId: 4 },
      { movieId: 4, characterId: 5 },
      { movieId: 5, characterId: 4 },
      { movieId: 5, characterId: 6 },
      { movieId: 6, characterId: 5 },
      { movieId: 6, characterId: 6 },
      { movieId: 7, characterId: 7 },
      { movieId: 7, characterId: 8 },
      { movieId: 8, characterId: 7 },
      { movieId: 8, characterId: 9 },
      { movieId: 9, characterId: 8 },
      { movieId: 9, characterId: 9 },
    ];
    await queryInterface.bulkInsert('character_movies', newCharacterMovies);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('character_movies', null, {});
  },
};
