'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Program extends Model {
    static associate(models) {
      Program.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
      Program.belongsToMany(models.Character, {
        through: models.CharacterProgram,
        as: 'characters',
        foreignKey: 'programId',
      });
      Program.belongsToMany(models.Genre, {
        through: models.GenreProgram,
        as: 'genres',
        foreignKey: 'programId',
      });
    }
  }
  Program.init(
    {
      image: { type: DataTypes.STRING },
      title: { type: DataTypes.STRING, allowNull: false },
      creationDate: { type: DataTypes.DATE },
      score: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      modelName: 'Program',
      indexes: [{ unique: true, fields: ['title', 'userId'] }],
    }
  );
  return Program;
};
