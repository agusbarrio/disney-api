'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const newCharacters = [
      {
        image: 'https://placeimg.com/640/480/arch/grayscale',
        name: 'Character 1',
        age: 32,
        weight: 45,
        story:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus blanditiis laudantium inventore sit eum? Natus, expedita a? Excepturi dolor tempora reiciendis, cupiditate harum facere mollitia repudiandae non quasi in architecto.',
        id: 1,
        userId: 1,
      },
      {
        image: 'https://placeimg.com/640/480/nature/grayscale',
        name: 'Character 2',
        age: 75,
        weight: 23,
        story:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo temporibus, exercitationem minima accusamus sequi deleniti rerum earum itaque architecto pariatur voluptatem, harum officia in obcaecati iste ipsa excepturi quod fugiat!',
        id: 2,
        userId: 1,
      },
      {
        image: 'https://placeimg.com/640/480/people/grayscale',
        name: 'Character 3',
        age: 9,
        weight: 95,
        story:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa enim commodi doloribus quisquam soluta veniam similique tempora, pariatur laborum non, praesentium facere voluptas mollitia sed sint? Ab architecto delectus ratione?',
        id: 3,
        userId: 1,
      },
      {
        image: 'https://placeimg.com/640/480/arch/grayscale',
        name: 'Character 4',
        age: 32,
        weight: 45,
        story:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus blanditiis laudantium inventore sit eum? Natus, expedita a? Excepturi dolor tempora reiciendis, cupiditate harum facere mollitia repudiandae non quasi in architecto.',
        id: 4,
        userId: 2,
      },
      {
        image: 'https://placeimg.com/640/480/nature/grayscale',
        name: 'Character 5',
        age: 75,
        weight: 23,
        story:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo temporibus, exercitationem minima accusamus sequi deleniti rerum earum itaque architecto pariatur voluptatem, harum officia in obcaecati iste ipsa excepturi quod fugiat!',
        id: 5,
        userId: 2,
      },
      {
        image: 'https://placeimg.com/640/480/people/grayscale',
        name: 'Character 6',
        age: 9,
        weight: 95,
        story:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa enim commodi doloribus quisquam soluta veniam similique tempora, pariatur laborum non, praesentium facere voluptas mollitia sed sint? Ab architecto delectus ratione?',
        id: 6,
        userId: 2,
      },
      {
        image: 'https://placeimg.com/640/480/arch/grayscale',
        name: 'Character 7',
        age: 32,
        weight: 45,
        story:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus blanditiis laudantium inventore sit eum? Natus, expedita a? Excepturi dolor tempora reiciendis, cupiditate harum facere mollitia repudiandae non quasi in architecto.',
        id: 7,
        userId: 3,
      },
      {
        image: 'https://placeimg.com/640/480/nature/grayscale',
        name: 'Character 8',
        age: 75,
        weight: 23,
        story:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo temporibus, exercitationem minima accusamus sequi deleniti rerum earum itaque architecto pariatur voluptatem, harum officia in obcaecati iste ipsa excepturi quod fugiat!',
        id: 8,
        userId: 3,
      },
      {
        image: 'https://placeimg.com/640/480/people/grayscale',
        name: 'Character 9',
        age: 9,
        weight: 95,
        story:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa enim commodi doloribus quisquam soluta veniam similique tempora, pariatur laborum non, praesentium facere voluptas mollitia sed sint? Ab architecto delectus ratione?',
        id: 9,
        userId: 3,
      },
    ];
    await queryInterface.bulkInsert('characters', newCharacters);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characters', null, {});
  },
};
