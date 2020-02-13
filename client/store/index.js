import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './user';

const reducer = combineReducers({
  user: userReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
