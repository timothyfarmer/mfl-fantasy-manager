const Sequelize = require('sequelize');

const db = {};

require('dotenv').config();

const env = process.env;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  logging: console.log,
  dialect: 'mssql'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;