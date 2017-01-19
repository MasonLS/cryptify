import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './app/routes';
import configureStore from './app/store/configure';

let initialState = document.getElementById('initial-state').textContent;

if (initialState.length > 0) {
  initialState = JSON.parse(initialState);
}

const store = configureStore(initialState);

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById('root'));
