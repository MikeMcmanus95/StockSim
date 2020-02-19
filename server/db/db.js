const Sequelize = require('sequelize');
const dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/stock-sim';
const db = new Sequelize(dbUrl, {
  logging: false,
});

module.exports = db;
