'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genre_movies', {
      genreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id',
        },
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
        },
      },
    });
    await queryInterface.addConstraint('genre_movies', {
      fields: ['movieId', 'genreId'],
      name: 'unique_genre_movie',
      type: 'unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('genre_movies');
  },
};
