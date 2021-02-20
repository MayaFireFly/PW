import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { configRoutes } from './config';
import { routes } from '../constants';


const Router = () => {
  const token = useSelector(state => state.users.token);

  return(
    <Switch>
      { configRoutes.map(route => route.isPrivate && !token ?
        <Route
          key = { route.path }
          path = { route.path }
          exact = { route.exact }
          render = {props => <Redirect to = { routes.auth }/>}
        />:
        <Route
          key = { route.path }
          { ...route }          
        />
      )}
    </Switch>
  );
};

export default Router;
