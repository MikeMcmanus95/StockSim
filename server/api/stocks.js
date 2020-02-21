const router = require('express').Router();
const API_KEY = process.env.API_KEY || require('../../secrets');
const axios = require('axios');
const { User, Stock, UserStock } = require('../db/models');

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
    let { quantity, symbol } = req.body;
    let [stock,_] = await Stock.findOrCreate({ where: { symbol: symbol } });

    // Finding or adding stock to user portfolio
    const [userStock, wasCreated] = await UserStock.findOrCreate({
      where: {
        userId: req.user.id,
        stockId: stock.id,
      },
    });

    // If user already has bought this stock, update quantity.
    if (!wasCreated) {
      userStock.quantity += quantity;
    }
    userStock.totalValue = Math.floor(stock.price * userStock.quantity);
    await userStock.save();

    res.json(stock);
  } catch (error) {
    next(error);
  }
});


// GET STOCKS FOR USER
router.get('/:id', async (req, res, next) => {
  try {
    let userStocks = await User.findOne({
      where: { id: req.params.id},
      include: [{model: Stock}]
    })

    const stocksArr = [];
    // Structuring the data to match our front end
    userStocks.stocks.forEach(stock => {
      let newStock = {};
      newStock.id = stock.userStock.stockId;
      newStock.symbol = stock.dataValues.symbol;
      newStock.quantity = stock.userStock.quantity;
      stocksArr.push(newStock);
    });

    const query = generateQueryString(stocksArr);
    const { data } = await axios.get(query);

    let totalValue = 0;

    const finalUserStocks = stocksArr.map((stock => {
      const quote = data[stock.symbol].quote;
      stock.price = quote.latestPrice;
      stock.change = String(quote.change);
      stock.changePercent = String(quote.changePercent)
      stock.totalValue = Math.floor(quote.latestPrice * stock.quantity * 100)
      totalValue += stock.totalValue;
      return stock;
    }))
    const newPortfolio = {
      totalValue: totalValue,
      stocksArr: finalUserStocks,
    };
    res.send(newPortfolio);
  } catch (error) {
    next(error);
  }
});

const generateQueryString = (stocks) => {
  const symbolString = stocks.map((stock) => stock.symbol).join();
  const queryString = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolString}&types=quote&range=1m&last=5&&token=${API_KEY}`;
  return queryString;
}

module.exports = router;
