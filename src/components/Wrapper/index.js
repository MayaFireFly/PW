import React from 'react';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Menu from '../Menu';
import Copyright from '../Copyright';


const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',    
    minHeight: '100vh'
  }
}));

const Wrapper = ({ children }) => {
  const classes = useStyles();

  return <Container component = 'div' className = { classes.wrapper }>
    <Menu/>
    {children}
    <Copyright/>
  </Container>;
};

export default Wrapper;