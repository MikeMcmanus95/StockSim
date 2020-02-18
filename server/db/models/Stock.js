const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  change: {
    type: Sequelize.STRING,
  },
  changePercent: {
    type: Sequelize.STRING,
  },
});

module.exports = Stock;
