const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  date: {
    type: Sequelize.DATE,
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['BUY', 'SELL']],
    },
  },
});

module.exports = Transaction;
