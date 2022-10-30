'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class CharacterMovie extends Model {}
  CharacterMovie.init(
    {},
    {
      sequelize,
      modelName: 'CharacterMovie',
      tableName: 'character_movies',
      indexes: [{ unique: true, fields: ['characterId', 'movieId'] }],
      timestamps: false,
    }
  );
  return CharacterMovie;
};
