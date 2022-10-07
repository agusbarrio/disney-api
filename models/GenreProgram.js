'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class GenreProgram extends Model {}
  GenreProgram.init(
    {},
    {
      sequelize,
      modelName: 'GenreProgram',
      timestamps: false,
    }
  );
  return GenreProgram;
};
