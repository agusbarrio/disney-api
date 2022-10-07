'use strict';

const { db } = require('../models');

const usersRepository = {
  findOrCreate: async ({ email, password }) => {
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
      },
    });
    return [user, created];
  },
  getByEmail: async (email) => {
    const user = await db.User.findOne({ where: { email } });
    return user;
  },
  getById: async (id) => {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  },
};

module.exports = usersRepository;
