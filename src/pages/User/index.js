import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import UserInfo from '../../components/UserInfo';
import { CircularProgress } from '@material-ui/core';
import TransactionsTable from '../../components/TransactionsTable';

import { fetchUser } from '../../store/slices/users';
import { fetchTransactions } from '../../store/slices/transactions';
import { setSelectedTransaction } from '../../store/slices/ui';

import { routes } from '../../constants';


const User = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.currentUser);
  const token = useSelector(state => state.users.token);
  const loading = useSelector(state => state.ui.loading);
  const transactions = useSelector(state => state.transactions.transactions);
  const [selectTrans, setSelectTrans] = useState();

  const gotoPW = () => {
    history.push(routes.pw);
  };

  useEffect(() => {
    if (!user && token) {
      (async () => {
        await fetchUser(dispatch, token);
      })();
    }
  }, [user, token, dispatch]);

  useEffect(() => {
    if (transactions.length === 0) {
      (async () => {
        await fetchTransactions(dispatch, token);
      })();
    }    
  }, [token, dispatch]);

  useEffect(() => {
    if (selectTrans) {
      dispatch(setSelectedTransaction(selectTrans));
      history.push(routes.pw);
    }
  }, [selectTrans, dispatch, history]);

  return <Wrapper>    
    {user && <UserInfo user = { user } gotoPW = { gotoPW } isFull = { true }/>}
    {loading && <CircularProgress/>}
    {transactions && transactions.length > 0 &&
      <TransactionsTable transactions = { transactions } selectTransaction = {setSelectTrans}/>
    }
  </Wrapper>;
};

export default User;