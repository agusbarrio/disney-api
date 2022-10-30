'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class GenreMovie extends Model {}
  GenreMovie.init(
    {},
    {
      sequelize,
      modelName: 'GenreMovie',
      modelName: 'genre_movies',
      timestamps: false,
    }
  );
  return GenreMovie;
};
