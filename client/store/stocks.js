import axios from 'axios';
import { API_KEY } from '../../secrets';

const GET_STOCKS = 'GET_STOCKS';

const defaultState = {};

const getStocks = stocks => ({ type: GET_STOCKS, stocks });

export const getStocksThunk = name => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${API_KEY}`
    );
    dispatch(getStocks(data));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_STOCKS:
      return action.stocks;
    default:
      return state;
  }
}
