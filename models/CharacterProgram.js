'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class CharacterProgram extends Model {}
  CharacterProgram.init(
    {},
    {
      sequelize,
      modelName: 'CharacterProgram',
      indexes: [{ unique: true, fields: ['characterId', 'programId'] }],
      timestamps: false,
    }
  );
  return CharacterProgram;
};
