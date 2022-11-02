'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('character_movies', {
      characterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'characters',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.addConstraint('character_movies', {
      fields: ['characterId', 'movieId'],
      name: 'unique_character_movie',
      type: 'unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('character_movies');
  },
};
