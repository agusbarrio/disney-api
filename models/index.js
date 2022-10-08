'use strict';
const Sequelize = require('sequelize');
const _ = require('lodash');
let db = {};
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_UPDATE,
} = require('../config');

let sequelize;

async function initDb() {
  console.log('Trying to connect DB...');
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });
}

async function initDbModels() {
  console.log('Mapping models...');
  db.User = require('./User')(sequelize);
  db.Movie = require('./Movie')(sequelize);
  db.Character = require('./Character')(sequelize);
  db.Genre = require('./Genre')(sequelize);
  db.CharacterMovie = require('./CharacterMovie')(sequelize);
  db.GenreMovie = require('./GenreMovie')(sequelize);

  const dbModelNames = Object.keys(db);
  await Promise.all(
    dbModelNames.map(async (modelName) => {
      if (_.isFunction(db[modelName].associate)) {
        return db[modelName].associate(db);
      } else {
        return null;
      }
    })
  );

  if (DB_UPDATE) {
    for (let index = 0; index < dbModelNames.length; index++) {
      await db[dbModelNames[index]].sync({ alter: true });
      console.log(`Sync model ${dbModelNames[index]}`);
    }
  }
}

module.exports = { initDb, initDbModels, db };
