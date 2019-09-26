const db = require('../database/db');

module.exports = db.sequelize.define('players', {
  PlayerID: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    len: 50
  },
  PlayerName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    len: 500
  },
  PlayerPosition: {
    type: db.Sequelize.STRING,
    allowNull: false,
    len: 10
  },
  PlayerTeam: {
    type: db.Sequelize.STRING,
    allowNull: true,
    len: 10
  }
}, {
  timestamps: false,
  dialect: 'mssql',
  force: true
});