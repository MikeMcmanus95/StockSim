const { db } = require('../server/db/models');
const users = require('./users.json');
const stocks = require('./stocks.json');
const transactions = require('./transactions.json');

const seed = async () => {
  try {
    console.log('syncing DB...');
    await db.sync({ force: true });
    console.log('db synced!');

    console.log('seeding DB...');
    await db.models.user.bulkCreate(users);
    await db.models.stock.bulkCreate(stocks);
    console.log('seeded!');

    db.close();
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  seed,
};

if (require.main === module) {
  seed();
}
