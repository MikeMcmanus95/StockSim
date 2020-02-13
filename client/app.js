import React from 'react';
import { render } from 'react-dom';
import { Main } from './components/Main';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import history from './history';
import Routes from './routes';
// import {Provider} from 'react-redux'

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
