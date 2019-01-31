import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Staff } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/staff" component={Staff} />
  </Switch>
);

export default Routes;
