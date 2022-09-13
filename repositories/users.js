'use strict';

const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const create = async ({ username, password }) => {
  const newUser = await User.create({ username, password });
  return newUser;
};
const deleteOne = async (id) => {
  const count = await User.destroy({ where: { id } });
  return count;
};
const getByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};
const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user;
};
module.exports = { getAll, create, deleteOne, getByUsername, getById };
