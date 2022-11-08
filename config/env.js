'use strict';
require('dotenv').config();
const pe = process.env;

module.exports = {
  DB_HOST: pe.DB_HOST,
  DB_PORT: pe.DB_PORT,
  DB_NAME: pe.DB_NAME,
  DB_USER: pe.DB_USER,
  DB_PASSWORD: pe.DB_PASSWORD,
  PORT: pe.PORT || 8080,
  JWT_SECRET: pe.JWT_SECRET,
  SENDGRID_API_KEY: pe.SENDGRID_API_KEY,
  SENDGRID_EMAIL: pe.SENDGRID_EMAIL,
};
