const router = require('express').Router();
const { Stock, Portfolio, PortfolioStock } = require('../db/models');

// GET ALL STOCKS
router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (error) {
    next(error);
  }
});

// CREATES OR UPDATES NEW STOCK AND ADDS TO USER PORTFOLIO
router.post('/', async (req, res, next) => {
  try {
    let { price, change, quantity, symbol } = req.body;
    let stock = await Stock.findOne({ where: { symbol: symbol } });

    const portfolio = await Portfolio.findOne({
      where: { userId: req.user.id },
    });

    if (stock) {
      stock = await stock.update({ price, change });
    } else {
      stock = await Stock.create(req.body);
    }

    const [portfolioStock, wasCreated] = await PortfolioStock.findOrCreate({
      where: {
        portfolioId: portfolio.id,
        stockId: stock.id,
      },
    });

    if (!wasCreated) {
      portfolioStock.quantity += quantity;
      await portfolioStock.save();
    }
    res.json(stock);
  } catch (error) {
    next(error);
  }
});

// GET STOCKS FOR USER
router.get('/:id', async (req, res, next) => {
  try {
    const stocks = await Portfolio.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: Stock,
        },
      ],
    });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
