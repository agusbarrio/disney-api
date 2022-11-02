'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const newUsers = [
      {
        email: 'ej1@ej1.com',
        id: 1,
        password: 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=',
      },
      {
        email: 'ej2@ej2.com',
        id: 2,
        password: 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=',
      },
      {
        email: 'ej3@ej3.com',
        id: 3,
        password: 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=',
      },
    ];
    await queryInterface.bulkInsert('users', newUsers);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
