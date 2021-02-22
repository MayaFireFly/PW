import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import UserInfo from '../../components/UserInfo';
import { CircularProgress } from '@material-ui/core';

import { fetchUser } from '../../store/slices/users';

import { routes } from '../../constants';


const User = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.currentUser);
  const token = useSelector(state => state.users.token);
  const loading = useSelector(state => state.ui.loading);

  const gotoTransactions = () => {
    history.push(routes.transactions);
  };

  useEffect(() => {
    if (!user && token) {
      (async () => {
        await fetchUser(dispatch, token);
      })();
    }
  }, [user, token, dispatch]);

  return <Wrapper>
    {loading && <CircularProgress/>}
    {user && <UserInfo user = { user } gotoTransactions = { gotoTransactions }/>}
  </Wrapper>;
};

export default User;