'use strict';

const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const create = async ({ email, password }) => {
  const newUser = await User.create({ email, password });
  return newUser;
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
module.exports = { getAll, create, deleteOne, getByEmail, getById };
