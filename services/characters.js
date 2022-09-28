'use strict';
const charactersRepository = require('../repositories/characters');

const getAll = async () => {
  const characters = await charactersRepository.getAll();
  return characters;
};

module.exports = { getAll };
