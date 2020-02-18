const User = require('./User');
const Portfolio = require('./Portfolio');
const Stock = require('./Stock');
const PortfolioStock = require('./PortfolioStock');
const Transaction = require('./Transaction');
const db = require('../db');

// This is where we define our associations, also our main place to export.
// Example: const {User} = require('../db/models')

Portfolio.belongsTo(User);
User.hasMany(Transaction);
Stock.belongsToMany(Portfolio, { through: PortfolioStock });
Portfolio.belongsToMany(Stock, { through: PortfolioStock });

module.exports = {
  User,
  Portfolio,
  PortfolioStock,
  Stock,
  Transaction,
  db,
};
