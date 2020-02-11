const User = require('./User');
const db = require('../db');

// This is where we define our associations, also our main place to export.
// Example: const {User} = require('../db/models')

module.exports = {
  User,
  db,
};
