'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class GenreMovie extends Model {}
  GenreMovie.init(
    {},
    {
      sequelize,
      modelName: 'GenreMovie',
      timestamps: false,
    }
  );
  return GenreMovie;
};
