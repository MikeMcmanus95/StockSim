import axios from 'axios';
import { addTransactionThunk } from './transactions';
import { purchaseThunk } from './user';

/**
 * ACTION TYPES
 */
const ADD_STOCK = 'ADD_STOCK';
const GET_PORTFOLIO = 'GET_PORTFOLIO';
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
const stockError = message => ({
  type: STOCK_ERROR,
  errorMsg: message,
});

/**
 * THUNK CREATORS
 */
export const addStockThunk = (name, qty) => async (dispatch, getState) => {
  try {
    const res = await axios.get('/auth/key');
    name = name.toUpperCase();
    const queryString = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${res.data}`;

    const { data } = await axios.get(queryString);
    const quoteData = data[name].quote;
    const { user } = getState();
    qty = Math.floor(qty);
    if (qty !== Math.abs(qty) || qty <= 0) throw new Error('Invalid quantity.');

    const stock = {
      symbol: quoteData.symbol,
      latestPrice: Math.floor(quoteData.latestPrice * 100),
      change: quoteData.change,
      changePercent: String(quoteData.changePercent),
      open: quoteData.open,
      quantity: qty,
      totalValue: quoteData.latestPrice * qty * 100,
    };

    // Add or update a record of that stock in our database
    await axios.post('/api/stocks', stock);

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
    dispatch(
      stockError('Error purchasing stock. Check your ticker or quantity.')
    );
    console.error(error);
  }
};

export const getPortfolioThunk = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const { data } = await axios.get(`/api/stocks/${user.id}`);

    dispatch(getPortfolio(data));
  } catch (error) {
    dispatch(stockError('Error retrieving stocks.'));
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
    case STOCK_ERROR:
      return { ...state, errorMsg: action.errorMsg };
    default:
      return state;
  }
}
