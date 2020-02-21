const User = require('./User');
const Stock = require('./Stock');
const UserStock = require('./UserStock');
const Transaction = require('./Transaction');
const db = require('../db');

// This is where we define our associations, also our main place to export.

User.hasMany(Transaction);
Stock.belongsToMany(User, { through: UserStock });
User.belongsToMany(Stock, { through: UserStock });

module.exports = {
  User,
  UserStock,
  Stock,
  Transaction,
  db,
};
