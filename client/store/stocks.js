import axios from 'axios';
import { API_KEY } from '../../secrets';

/**
 * ACTION TYPES
 */
const ADD_STOCK = 'ADD_STOCK';

/**
 * INITIAL STATE
 */
const defaultState = [];

/**
 * ACTION CREATORS
 */
const addStock = stock => ({ type: ADD_STOCK, stock });

/**
 * THUNK CREATORS
 */
export const addStockThunk = (name, qty) => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${API_KEY}`
    );
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

    // Add a record of that stock to our database
    await axios.post('/api/stocks', {
      symbol: stock.symbol,
      price: stock.latestPrice,
      change: stock.change,
    });

    // Add that stock to our front end state
    dispatch(addStock(stock));
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
      return [...state, action.stock];
    default:
      return state;
  }
}
