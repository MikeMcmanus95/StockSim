const router = require('express').Router();
const { Stock, Transaction } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.json(newTransaction);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const userTransactions = await Transaction.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(userTransactions);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
