const router = require('express').Router();
const { Stock } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const stock = await Stock.create(req.body);
    res.json(stock);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
