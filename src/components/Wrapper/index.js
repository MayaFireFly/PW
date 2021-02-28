import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Menu from '../Menu';
import Copyright from '../Copyright';
import Modal from '../Modal';

import { setError } from '../../store/slices/ui';
import { clearError } from '../../store/slices/transactions';

import { routes } from '../../constants';


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
  const error = useSelector(state => state.ui.error);
  const errorTransactions = useSelector(state => state.transactions.error);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(error.message.length > 0);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    dispatch(setError({message: ''}));
    dispatch(clearError());
    history.push(routes.base);
  };

  useEffect(() => {
    if (error.message.length > 0) {
      setOpen(true);
      setMessage(error.message);
    }
  }, [error.message]);

  useEffect(() => {
    if (errorTransactions.message.length > 0) {
      setOpen(true);
      setMessage(errorTransactions.message);
    }
  }, [errorTransactions.message]);

  return <Container component = 'div' className = { classes.wrapper }>
    <Menu/>
    {children}
    <Modal open = { open } onOk = { onClose } title = 'Error' message = { message }/>
    <Copyright/>
  </Container>;
};

export default Wrapper;