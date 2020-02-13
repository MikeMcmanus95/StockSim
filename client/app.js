import React from 'react';
import { render } from 'react-dom';
import { About } from './components/About';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from './store';
import history from './history';
import Routes from './routes';
import Navbar from './components/Navbar';
// import {Provider} from 'react-redux'

render(
  <Provider store={store}>
    <Router history={history}>
      <Navbar />
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);
