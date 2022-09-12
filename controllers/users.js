'use strict';

const usersService = require('../services/users');

const getAll = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const count = await usersService.deleteOne(req.params.id);
    res.status(200).send('deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, deleteOne };
