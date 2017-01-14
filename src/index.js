import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Login from './components/login';


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Login} />
        <Route path="home" component={App} />
      </Route>
    </Router>
  ),document.getElementById('root')
);
