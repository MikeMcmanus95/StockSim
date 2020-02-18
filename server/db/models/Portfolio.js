const Sequelize = require('sequelize');
const db = require('../db');

const Portfolio = db.define('portfolio', {
  totalValue: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Portfolio;