const db = require('../database/db');

module.exports = db.sequelize.define('players', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    len: 50
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    len: 500
  },
  position: {
    type: db.Sequelize.STRING,
    allowNull: false,
    len: 10
  },
  team: {
    type: db.Sequelize.STRING,
    allowNull: true,
    len: 10
  }
}, {
  timestamps: false,
  dialect: 'mssql',
});