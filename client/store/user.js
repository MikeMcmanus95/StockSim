import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const PURCHASE = 'PURCHASE';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const purchase = amount => ({ type: PURCHASE, amount });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (error) {
    console.error(error);
  }
};

export const auth = (method, email, password, name) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, name, password });
  } catch (error) {
    console.error('Failed to post, ', error);
  }
  try {
    dispatch(getUser(res.data));
    history.push('/');
  } catch (error) {
    console.error('Failed to dispatch/history, ', error);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const purchaseThunk = amount => async (dispatch, getState) => {
  try {
    const userId = getState().user.id;
    await axios.put(`/api/users/${userId}`, { cashBal: amount });
    dispatch(purchase(amount));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case PURCHASE:
      return { ...state, cashBal: state.cashBal - action.amount };
    default:
      return state;
  }
}
