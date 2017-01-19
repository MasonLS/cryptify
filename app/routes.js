import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Login from './components/login';


export default (
  <Route path="/">
    <IndexRoute component={Login} />
    <Route path="home" component={App} />
  </Route>
);
