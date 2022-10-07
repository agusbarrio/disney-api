'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Character, {
        as: 'characters',
        foreignKey: 'userId',
      });
      User.hasMany(models.Program, {
        as: 'programs',
        foreignKey: 'userId',
      });
      User.hasMany(models.Genre, { as: 'genres', foreignKey: 'userId' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      indexes: [{ unique: true, fields: ['email'] }],
      paranoid: true,
    }
  );
  return User;
};
