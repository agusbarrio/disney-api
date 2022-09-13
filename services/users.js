'use strict';
const usersRepository = require('../repositories/users');

const getAll = async () => {
  const users = await usersRepository.getAll();
  return users;
};

const deleteOne = async (id) => {
  const count = await usersRepository.deleteOne(id);
  return count;
};

const getById = async (id) => {
  const user = await usersRepository.getById(id);
};

module.exports = { getAll, deleteOne, getById };