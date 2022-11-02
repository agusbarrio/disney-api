'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const newGenres = [
      {
        name: 'Genre 1',
        image: 'https://placeimg.com/640/480/animals',
        id: 1,
        userId: 1,
      },
      {
        name: 'Genre 2',
        image: 'https://placeimg.com/640/480/arch',
        id: 2,
        userId: 1,
      },
      {
        name: 'Genre 3',
        image: 'https://placeimg.com/640/480/nature',
        id: 3,
        userId: 1,
      },
      {
        name: 'Genre 4',
        image: 'https://placeimg.com/640/480/animals',
        id: 4,
        userId: 2,
      },
      {
        name: 'Genre 5',
        image: 'https://placeimg.com/640/480/arch',
        id: 5,
        userId: 2,
      },
      {
        name: 'Genre 6',
        image: 'https://placeimg.com/640/480/nature',
        id: 6,
        userId: 2,
      },
      {
        name: 'Genre 7',
        image: 'https://placeimg.com/640/480/animals',
        id: 7,
        userId: 3,
      },
      {
        name: 'Genre 8',
        image: 'https://placeimg.com/640/480/arch',
        id: 8,
        userId: 3,
      },
      {
        name: 'Genre 9',
        image: 'https://placeimg.com/640/480/nature',
        id: 9,
        userId: 3,
      },
    ];
    await queryInterface.bulkInsert('genres', newGenres);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  },
};
