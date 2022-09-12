require('dotenv').config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_UPDATE,
  PORT,
  JWT_SECRET,
} = process.env;

module.exports = {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_UPDATE: DB_UPDATE || false,
  PORT: PORT || 8080,
  JWT_SECRET,
};
