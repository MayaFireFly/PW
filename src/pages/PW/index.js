import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import SearchForm from '../../components/SearchForm';
import UserInfo from '../../components/UserInfo';
import CreateTransactionForm from '../../components/CreateTransactionForm';
import Modal from '../../components/Modal';

import { fetchUsers, setUsers, setBalance } from '../../store/slices/users';
import { createTransaction } from '../../store/slices/transactions';

import { routes } from '../../constants';


const PW = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.currentUser);
  const users = useSelector(state => state.users.users);
  const token = useSelector(state => state.users.token);  
  const selectedTransaction = useSelector(state => state.ui.selectedTransaction);
  const error = useSelector(state => state.ui.error);
  const [search, setSearch] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [amount, setAmount] = useState();
  const [open, setOpen] = useState(false);

  const clearUsers = () => {
    dispatch(setUsers([]));
  };

  useEffect(() => {
    if (search && token) {
      (async () => {
        const data = { token, filter: search };
        await fetchUsers(dispatch, data);
      })();
    }
  }, [search, token, dispatch]);

  useEffect(() => { 
    if (selectedUser && amount && token) {
      (async () => {
        await createTransaction(dispatch, {
          name: selectedUser,
          amount,
          token
        });
        setOpen(true);
        dispatch(setBalance(user.balance - amount));
      })();
    }
  }, [selectedUser, amount, dispatch, token]);

  const onCancel = () => {
    setOpen(false);
    history.push(routes.user);
  };

  return <Wrapper> 
    {open && error.message.length === 0 &&
      <Modal
        open = { open }
        onOk = {() => setOpen(false)}
        title = { 'Success' }
        message = { 'Do you want to stay here or to go to Info tab?' }
        cancelExists = { true }
        onCancel = { onCancel }
        note = { '(OK - to stay, CANCEL - to User tab)' }
      />
    }
    {user && <UserInfo user = { user } isFull = {false}/>}  
    <SearchForm 
      searchUser = { setSearch } 
      users = { users } 
      selectUser = { setSelectedUser } 
      clearUsers = { clearUsers }
      beginUser = {selectedTransaction && selectedTransaction.username ? selectedTransaction.username : ''}
    />
    <CreateTransactionForm 
      maxAmount = {user ? user.balance : 0} 
      setData = { setAmount }
      beginAmount = {selectedTransaction && selectedTransaction.amount ? Math.abs(selectedTransaction.amount) : 0}
    />
  </Wrapper>;
};

export default PW;