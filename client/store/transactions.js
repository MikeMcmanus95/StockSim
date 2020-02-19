import axios from 'axios';

/**
 * ACTION TYPES
 */
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const GET_HISTORY = 'GET_HISTORY';

/**
 * INITIAL STATE
 */
const defaultState = { transactionsArr: [], errorMsg: '' };

/**
 * ACTION CREATORS
 */
const addTransaction = transaction => ({ type: ADD_TRANSACTION, transaction });

const getHistory = transactions => ({
  type: GET_HISTORY,
  transactions,
});

/**
 * THUNK CREATORS
 */
export const addTransactionThunk = (transaction, type, quantity) => async (
  dispatch,
  getState
) => {
  try {
    // Get portfolio and make a deep copy of the most recently bought stock
    const { user, portfolio } = getState();
    const lastIdx = portfolio.stocksArr.length - 1;
    const transaction = { ...portfolio.stocksArr[lastIdx] };

    // Modify the data such that it matches what we want in the transactions table
    transaction.userId = user.id;
    transaction.date = new Date();
    transaction.type = type;
    transaction.quantity = quantity;
    transaction.price = transaction.latestPrice;
    transaction.totalValue = transaction.price * quantity;

    // Send this new transaction to our database and dispatch to front end state
    await axios.post('/api/transactions', transaction);
    dispatch(addTransaction(transaction));
  } catch (error) {
    console.error(error);
  }
};

export const getHistoryThunk = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const { data } = await axios.get(`/api/transactions/${user.id}`);
    dispatch(getHistory(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        transactionsArr: [...state.transactionsArr, action.transaction],
      };
    case GET_HISTORY:
      return {
        transactionsArr: action.transactions,
      };
    default:
      return state;
  }
}
