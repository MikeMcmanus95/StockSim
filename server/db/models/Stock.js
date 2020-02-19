const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
    },
  },
  change: {
    type: Sequelize.STRING,
  },
  changePercent: {
    type: Sequelize.STRING,
  },
});

module.exports = Stock;
