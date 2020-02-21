const Sequelize = require('sequelize');
const db = require('../db');

const UserStock = db.define('userStock', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 1,
  },
});

module.exports = UserStock;
