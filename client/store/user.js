import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });

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

export const auth = (email, name, password) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/signup`, { email, name, password });
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

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
