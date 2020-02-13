const User = require('./User');
const Portfolio = require('./Portfolio');
const Stock = require('./Stock');
const PortfolioStock = require('./PortfolioStock');
const db = require('../db');

// This is where we define our associations, also our main place to export.
// Example: const {User} = require('../db/models')

Portfolio.belongsTo(User);
Stock.belongsToMany(Portfolio, { through: PortfolioStock });
Portfolio.belongsToMany(Stock, { through: PortfolioStock });

module.exports = {
  User,
  Portfolio,
  Stock,
  db,
};
