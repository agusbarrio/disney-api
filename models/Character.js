'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
      Character.belongsToMany(models.Movie, {
        through: models.CharacterMovie,
        as: 'movies',
        foreignKey: 'characterId',
      });
    }
  }
  Character.init(
    {
      image: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER },
      weight: { type: DataTypes.FLOAT },
      story: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Character',
      tableName: 'characters',
      indexes: [{ unique: true, fields: ['name', 'userId'] }],
      timestamps: false,
    }
  );
  return Character;
};
