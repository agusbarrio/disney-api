'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const newMovies = [
      {
        title: 'Movie 1',
        image: 'https://placeimg.com/640/480/people',
        score: 4.5,
        creationDate: '2020-06-02',
        id: 1,
        userId: 1,
      },
      {
        title: 'Movie 2',
        image: 'https://placeimg.com/640/480/tech',
        score: 4.7,
        creationDate: '2018-11-17',
        id: 2,
        userId: 1,
      },
      {
        title: 'Movie 3',
        image: 'https://placeimg.com/640/480/animals/grayscale',
        score: 2.3,
        creationDate: '2019-11-02',
        id: 3,
        userId: 1,
      },
      {
        title: 'Movie 4',
        image: 'https://placeimg.com/640/480/people',
        score: 4.5,
        creationDate: '2020-06-02',
        id: 4,
        userId: 2,
      },
      {
        title: 'Movie 5',
        image: 'https://placeimg.com/640/480/tech',
        score: 4.7,
        creationDate: '2018-11-17',
        id: 5,
        userId: 2,
      },
      {
        title: 'Movie 6',
        image: 'https://placeimg.com/640/480/animals/grayscale',
        score: 2.3,
        creationDate: '2019-11-02',
        id: 6,
        userId: 2,
      },
      {
        title: 'Movie 7',
        image: 'https://placeimg.com/640/480/people',
        score: 4.5,
        creationDate: '2020-06-02',
        id: 7,
        userId: 3,
      },
      {
        title: 'Movie 8',
        image: 'https://placeimg.com/640/480/tech',
        score: 4.7,
        creationDate: '2018-11-17',
        id: 8,
        userId: 3,
      },
      {
        title: 'Movie 9',
        image: 'https://placeimg.com/640/480/animals/grayscale',
        score: 2.3,
        creationDate: '2019-11-02',
        id: 9,
        userId: 3,
      },
    ];
    await queryInterface.bulkInsert('movies', newMovies);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
