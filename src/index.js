import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Login from './components/login';
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={Login} />
          <Route path="home" component={App} />
        </Route>
      </Router>
    </Provider>
  ),document.getElementById('root')
);
