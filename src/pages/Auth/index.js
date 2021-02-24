import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Wrapper from '../../components/Wrapper';
import SignInForm from '../../components/SignInForm';
import { CircularProgress} from '@material-ui/core';

import { logout, fetchToken } from '../../store/slices/users';

import { routes } from '../../constants';



const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(state => state.users.token);
  const loading = useSelector(state => state.ui.loading);  
  const [data, setData] = useState();

  useEffect(() => {
    if (data) {
      (async() => {
        await fetchToken(dispatch, data, data.username ? true : false);
      })();
    }    
  }, [data, dispatch]);

  useEffect(() => {
    if (token) {
      data ? 
        history.push(routes.user):
        dispatch(logout());
    }    
  }, [token, history, data, dispatch]);

  return <Wrapper>
    { !token && loading && <CircularProgress /> }
    { !token && !loading && <SignInForm setData = {setData}/> }   
  </Wrapper>;
};

export default Auth;