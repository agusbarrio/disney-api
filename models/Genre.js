'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Genre extends Model {
    static associate(models) {
      Genre.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
      Genre.belongsToMany(models.Movie, {
        through: models.GenreMovie,
        as: 'movies',
        foreignKey: 'genreId',
      });
    }
  }
  Genre.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Genre',
      indexes: [{ unique: true, fields: ['name', 'userId'] }],
      timestamps: false,
    }
  );
  return Genre;
};
