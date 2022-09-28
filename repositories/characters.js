'use strict';

const { Character } = require('../models');

const getAll = async () => {
  const characters = await Character.findAll({ attributes: ['image', 'name'] });
  return characters;
};

module.exports = { getAll };
