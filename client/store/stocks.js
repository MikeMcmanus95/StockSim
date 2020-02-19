import axios from 'axios';
import { API_KEY } from '../../secrets';
import { addTransactionThunk } from './transactions';
import { purchaseThunk } from './user';

/**
 * ACTION TYPES
 */
const ADD_STOCK = 'ADD_STOCK';
const GET_PORTFOLIO = 'GET_PORTFOLIO';
const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
const STOCK_ERROR = 'STOCK_ERROR';

/**
 * INITIAL STATE
 */
const defaultState = { totalValue: 0, stocksArr: [], errorMsg: '' };

/**
 * ACTION CREATORS
 */
const addStock = stock => ({ type: ADD_STOCK, stock });
const getPortfolio = portfolio => ({ type: GET_PORTFOLIO, portfolio });
const updatePortfolio = (newPortfolio, newTotal) => ({
  type: UPDATE_PORTFOLIO,
  newPortfolio,
  newTotal,
});
const stockError = message => ({
  type: STOCK_ERROR,
  errorMsg: message,
});

/**
 * THUNK CREATORS
 */
export const addStockThunk = (name, qty) => async (dispatch, getState) => {
  try {
    const queryString = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${API_KEY}`;
    const { data } = await axios.get(queryString);
    const quoteData = data[name].quote;
    const user = getState().user;
    qty = Math.floor(Number(qty));

    const stock = {
      symbol: quoteData.symbol,
      latestPrice: quoteData.latestPrice,
      change: quoteData.change,
      changePercent: String(quoteData.changePercent),
      open: quoteData.open,
      quantity: qty,
      totalValue: quoteData.latestPrice * qty,
    };

    // Add or update a record of that stock in our database
    await axios.post('/api/stocks', {
      symbol: stock.symbol,
      price: stock.latestPrice,
      change: stock.change,
      changePercent: stock.changePercent,
      quantity: stock.quantity,
      totalValue: stock.totalValue,
    });

    let difference = user.cashBal - stock.totalValue;
    // If difference is not negative:
    if (difference > 0) {
      // Add that stock to our database & front end state
      dispatch(addStock(stock));

      // Add the transaction to our database & front end state
      dispatch(addTransactionThunk(stock, 'BUY', qty));

      // Update the users cash balance in the database & front end state
      dispatch(purchaseThunk(stock.totalValue));
    } else {
      dispatch(stockError('Error purchasing stock. Not enough cash.'));
    }
  } catch (error) {
    dispatch(stockError('Error purchasing stock. Check your ticker.'));
    console.error(error);
  }
};

export const getPortfolioThunk = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/stocks/${userId}`);
    dispatch(getPortfolio(data));
  } catch (error) {
    dispatch(stockError('Error retriving stocks.'));
    console.error(error);
  }
};

export const updatePortfolioThunk = portfolio => async dispatch => {
  try {
    const stockNames = portfolio.stocksArr.map(stock => stock.symbol);
    const queryString = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${stockNames.join()}&types=quote&range=1m&last=5&&token=${API_KEY}`;
    const { data } = await axios.get(queryString);
    let newTotalValue = 0;

    const newPortfolio = portfolio.stocksArr.map(stock => {
      const newStock = data[stock.symbol].quote;
      stock.price = newStock.latestPrice;
      stock.change = String(newStock.change);
      stock.changePercent = String(newStock.changePercent);
      stock.totalValue = newStock.latestPrice * stock.quantity;
      newTotalValue += stock.totalValue;
      return stock;
    });

    dispatch(updatePortfolio(newPortfolio, newTotalValue));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_STOCK:
      const purchaseValue = action.stock.latestPrice * action.stock.quantity;
      const found = state.stocksArr.find(
        stock => stock.symbol === action.stock.symbol
      );
      if (found) {
        action.stock.quantity += found.quantity;
      }
      const newTotalValue = action.stock.latestPrice * action.stock.quantity;
      action.stock.totalValue = newTotalValue;
      const newArr = state.stocksArr.filter(
        stock => stock.symbol !== action.stock.symbol
      );
      return {
        stocksArr: [...newArr, action.stock],
        totalValue: state.totalValue + purchaseValue,
      };
    case GET_PORTFOLIO:
      return {
        totalValue: action.portfolio.totalValue,
        stocksArr: action.portfolio.stocksArr,
      };
    case UPDATE_PORTFOLIO:
      return {
        totalValue: action.newTotal,
        stocksArr: action.newPortfolio,
      };
    case STOCK_ERROR:
      return { ...state, errorMsg: action.errorMsg };
    default:
      return state;
  }
}
