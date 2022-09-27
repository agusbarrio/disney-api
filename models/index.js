'use strict';
const Sequelize = require('sequelize');
const _ = require('lodash');

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_UPDATE,
} = require('../config');
const db = {};

console.log('Trying to connect DB...');
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

db.User = require('./User')(sequelize);
db.Program = require('./Program')(sequelize);
db.Character = require('./Character')(sequelize);
db.CharacterProgram = require('./CharacterProgram')(sequelize);

Object.keys(db).forEach(async (modelName) => {
  if (DB_UPDATE) {
    if (_.isFunction(db[modelName].associate)) {
      db[modelName].associate(db);
    }
    console.log(`Sync model ${modelName}`);
    await db[modelName].sync({ alter: true });
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
