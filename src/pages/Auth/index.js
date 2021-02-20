import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Wrapper from '../../components/Wrapper';
import SignInForm from '../../components/SignInForm';
import { CircularProgress } from '@material-ui/core';

import { logout, fetchToken } from '../../store/slices/users';

import { routes } from '../../constants';



const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(state => state.users.token);
  const loading = useSelector(state => state.ui.loading);
  const [data, setData] = useState();

  useEffect(() => {
    console.log('data');
    console.log(data);
    if (data) {
      const isNew = data.username ? true : false;
      (async() => {
        const res = await fetchToken(dispatch, data, isNew);
        console.log(res);
      })();
    }    
  }, [data, dispatch]);

  useEffect(() => {
    if (token) {
      history.push(routes.user);
    }
  }, [token, history]);

  return <Wrapper>
    { loading && <CircularProgress />}
    { !token && <SignInForm setData = {setData}/> }    
  </Wrapper>;
};

export default Auth;