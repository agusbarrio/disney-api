const config = require('./env.js');
module.exports = {
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
  },
};
