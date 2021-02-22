import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import { CircularProgress } from '@material-ui/core';
import SearchForm from '../../components/SearchForm';

import { fetchUsers, setUsers } from '../../store/slices/users';
import { fetchTransactions, createTransaction } from '../../store/slices/transactions';


const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const token = useSelector(state => state.users.token);
  const loading = useSelector(state => state.ui.loading);
  const transactions = useSelector(state => state.transactions.transactions);
  const selectedTransaction = useSelector(state => state.ui.selectedTransaction);
  const [search, setSearch] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const clearUsers = () => {
    dispatch(setUsers([]));
  };

  useEffect(() => {
    if (search && token) {
      (async () => {
        const data = { token, filter: search };
        console.log('data');
        console.log(data);
        await fetchUsers(dispatch, data);
      })();
    }
  }, [search, token, dispatch]);

  useEffect(() => { 
    console.log('users'); 
    console.log(users);
  }, [users]);

  useEffect(() => { 
    console.log('selectedUser');
    console.log(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    if (transactions.length === 0) {
      (async () => {
        await fetchTransactions(dispatch, token);
      })();
    }    
  }, [transactions, transactions.length, token, dispatch]);

  return <Wrapper>
    {loading && <CircularProgress/>}
    <SearchForm searchUser = { setSearch } users = { users } selectUser = { setSelectedUser } clearUsers = { clearUsers }/>
  </Wrapper>;
};

export default Transactions;