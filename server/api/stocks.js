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

    // Checking if stock exists, if so, update the price to latest
    if (stock) {
      stock = await stock.update({ price, change });
    } else {
      stock = await Stock.create(req.body);
    }

    // Finding or adding stock to user portfolio
    const [portfolioStock, wasCreated] = await PortfolioStock.findOrCreate({
      where: {
        portfolioId: portfolio.id,
        stockId: stock.id,
      },
    });

    // If stock exists in portfolio, update quantity.
    if (!wasCreated) {
      portfolioStock.quantity += quantity;
    }
    portfolioStock.totalValue = stock.price * portfolioStock.quantity;
    await portfolioStock.save();

    // Lastly, update the total value of all stocks in user portfolio
    portfolio.totalValue += stock.price;
    await portfolio.save();

    res.json(stock);
  } catch (error) {
    next(error);
  }
});

// GET STOCKS FOR USER
router.get('/:id', async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: Stock,
        },
      ],
    });
    console.log(portfolio);
    // Structuring the data to match our front end
    stocksArr = portfolio[0].stocks.map(stock => {
      stock.dataValues.quantity = stock.portfolioStock.quantity;
      stock.dataValues.id = stock.portfolioStock.stockId;
      stock.dataValues.portfolioId = stock.portfolioStock.portfolioId;
      stock.dataValues.totalValue =
        stock.dataValues.price * stock.portfolioStock.quantity;
      return stock;
    });
    const stocks = {
      stocksArr: stocksArr,
      totalValue: portfolio[0].totalValue,
    };
    res.json(stocks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
