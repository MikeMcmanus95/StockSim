import axios from 'axios';
import { API_KEY } from '../../secrets';

/**
 * ACTION TYPES
 */
const ADD_STOCK = 'ADD_STOCK';
const GET_STOCKS = 'GET_STOCKS';
const STOCK_ERROR = 'STOCK_ERROR';

/**
 * INITIAL STATE
 */
const defaultState = { stocksArr: [], errorMsg: '' };

/**
 * ACTION CREATORS
 */
const addStock = stock => ({ type: ADD_STOCK, stock });
const getStocks = stocks => ({ type: GET_STOCKS, stocks });

const stockError = () => ({
  type: STOCK_ERROR,
  errorMsg: 'Error purchasing stock. Probably an invalid ticker.',
});

/**
 * THUNK CREATORS
 */
export const addStockThunk = (name, qty) => async dispatch => {
  try {
    const queryString = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${API_KEY}`;
    const { data } = await axios.get(queryString);
    const quoteData = data[name].quote;
    qty = Math.floor(Number(qty));

    const stock = {
      symbol: quoteData.symbol,
      latestPrice: quoteData.latestPrice,
      change: quoteData.change,
      open: quoteData.open,
      quantity: qty,
      totalValue: quoteData.latestPrice * qty,
    };

    // Add or update a record of that stock in our database
    await axios.post('/api/stocks', {
      symbol: stock.symbol,
      price: stock.latestPrice,
      change: stock.change,
      quantity: stock.quantity,
    });

    // Add that stock to our front end state
    dispatch(addStock(stock));
  } catch (error) {
    dispatch(stockError());
    console.error(error);
  }
};

export const getStocksThunk = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/stocks/${userId}`);
    dispatch(getStocks(data[0].stocks));
  } catch (error) {
    dispatch(stockError());
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_STOCK:
      if (state.stocksArr.includes(action.stock)) {
        const newArr = state.stocksArr.map(stock => {
          if (stock.symbol === action.stock.symbol) {
            stock.quantity += action.quantity;
          }
          return stock;
        });
        return { stocksArr: newArr };
      } else {
        return { stocksArr: [...state.stocksArr, action.stock] };
      }
    case GET_STOCKS:
      return { stocksArr: action.stocks };
    case STOCK_ERROR:
      return { ...state, errorMsg: action.errorMsg };
    default:
      return state;
  }
}
