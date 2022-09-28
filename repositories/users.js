'use strict';

const { User } = require('../models');

const findOrCreate = async ({ email, password }) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      password,
    },
  });
  return { user, created };
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user;
};
module.exports = { findOrCreate, getByEmail, getById };
