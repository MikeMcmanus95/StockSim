const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/stock-sim', {
  logging: false,
});

module.exports = db;
