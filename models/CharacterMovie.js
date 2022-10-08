'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class CharacterMovie extends Model {}
  CharacterMovie.init(
    {},
    {
      sequelize,
      modelName: 'CharacterMovie',
      indexes: [{ unique: true, fields: ['characterId', 'movieId'] }],
      timestamps: false,
    }
  );
  return CharacterMovie;
};
