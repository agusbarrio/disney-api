'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Program extends Model {
    static associate(models) {
      Program.belongsToMany(models.Character, {
        through: models.CharacterProgram,
        foreignKey: 'programId',
      });
    }
  }
  Program.init(
    {
      image: { type: DataTypes.STRING },
      title: { type: DataTypes.STRING },
      creationDate: { type: DataTypes.DATE },
      score: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      modelName: 'Program',
    }
  );
  return Program;
};
