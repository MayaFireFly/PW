import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Tabs, Tab, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { configRoutes } from '../../route/config';


const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%'
  }
}));

const Menu = () => {
  const classes = useStyles();
  const token = useSelector(state => state.users.token);
  const history = useHistory();
  const [value, setValue] = useState(history.location && history.location.pathname ? 
    history.location.pathname :
    configRoutes[0].path);

  return <Paper className = {classes.paper}>
    <Tabs
      value = {value}
      onChange = {(event, newValue) => {
        setValue(newValue);
        history.push(newValue);
      }}
      textColor = 'primary'
      indicatorColor = 'primary'
      centered
    >
      { token ?
        configRoutes          
          .map(route =>
            <Tab key = { route.path } label = { route.privateTitle ?? route.title } value = { route.path }/> 
          ) :
        configRoutes 
          .filter(route => !route.isPrivate)         
          .map(route =>
            <Tab key = { route.path } label = { route.title } value = { route.path }/> 
          ) 
      }
    </Tabs>
  </Paper>;
};

export default Menu;