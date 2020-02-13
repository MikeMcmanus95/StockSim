const Sequelize = require('sequelize');
const db = require('../db');

const PortfolioStock = db.define('portfolioStock', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 1,
  },
});

module.exports = PortfolioStock;
