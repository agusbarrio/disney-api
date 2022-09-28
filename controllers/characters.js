'use strict';

const charactersService = require('../services/characters');

const getAll = async (req, res, next) => {
  try {
    const characters = await charactersService.getAll();
    res.json(characters);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll };
