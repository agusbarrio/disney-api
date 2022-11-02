'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('characters', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('genres', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('movies', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('characters', {
      fields: ['name', 'userId'],
      type: 'unique',
      name: 'unique_character_user',
    });
    await queryInterface.addConstraint('genres', {
      fields: ['name', 'userId'],
      type: 'unique',
      name: 'unique_genre_user',
    });

    await queryInterface.addConstraint('movies', {
      fields: ['title', 'userId'],
      type: 'unique',
      name: 'unique_movie_user',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('movies', 'unique_movie_user');
    await queryInterface.removeConstraint('genres', 'unique_genre_user');
    await queryInterface.removeConstraint(
      'characters',
      'unique_character_user'
    );
    await queryInterface.removeColumn('movies', 'userId');
    await queryInterface.removeColumn('genres', 'userId');
    await queryInterface.removeColumn('characters', 'userId');
  },
};
