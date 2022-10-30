'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
      Movie.belongsToMany(models.Character, {
        through: models.CharacterMovie,
        as: 'characters',
        foreignKey: 'movieId',
      });
      Movie.belongsToMany(models.Genre, {
        through: models.GenreMovie,
        as: 'genres',
        foreignKey: 'movieId',
      });
    }
  }
  Movie.init(
    {
      image: { type: DataTypes.STRING },
      title: { type: DataTypes.STRING, allowNull: false },
      creationDate: { type: DataTypes.DATEONLY },
      score: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      modelName: 'Movie',
      modelName: 'movies',
      indexes: [{ unique: true, fields: ['title', 'userId'] }],
      timestamps: false,
    }
  );
  return Movie;
};
