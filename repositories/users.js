'use strict';

const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

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
const deleteOne = async (id) => {
  const count = await User.destroy({ where: { id } });
  return count;
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
module.exports = { getAll, findOrCreate, deleteOne, getByEmail, getById };
