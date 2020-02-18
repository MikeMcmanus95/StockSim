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
export const addTransactionThunk = (transaction, type) => async (
  dispatch,
  getState
) => {
  try {
    const userId = getState().user.id;
    transaction.userId = userId;
    transaction.date = new Date();
    transaction.type = type;
    await axios.post('/api/transactions', transaction);
    dispatch(addTransaction(transaction));
  } catch (error) {
    console.error(error);
  }
};

export const getHistoryThunk = () => async (dispatch, getState) => {
  try {
    const userId = getState().user.id;
    const { data } = await axios.get(`/api/transactions/${userId}`);
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
