'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsToMany(models.Program, {
        through: models.CharacterProgram,
        foreignKey: 'characterId',
      });
    }
  }
  Character.init(
    {
      image: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      weight: { type: DataTypes.FLOAT },
      story: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Character',
    }
  );
  return Character;
};
