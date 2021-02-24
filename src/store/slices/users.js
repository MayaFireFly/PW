import { createSlice } from '@reduxjs/toolkit';

import API from '../../networkers';
import { setLoading, setError } from './ui';


const fetchUsers = async (dispatch, data) => {
  dispatch(setLoading(true));
  try {
    const response = await API.users.getFilteredUserList(data);

    if (response.error) {
      dispatch(setError({message: response.error}));
    } else {
      dispatch(setUsers(response.data));
    } 

  } catch(error) {
    dispatch(setError({message: error.message}));
  } finally {
    dispatch(setLoading(false));
  }
};

const fetchUser = async (dispatch, data) => {
  dispatch(setLoading(true));
  try {
    const response = await API.users.getUserInfo(data);
    if (response.error) {
      dispatch(setError({message: response.error}));
    } else {
      dispatch(setCurrentUser(response.data.user_info_token));
    } 

  } catch(error) {
    dispatch(setError({message: error.message}));
  } finally {
    dispatch(setLoading(false));
  }
};

const fetchToken = async (dispatch, data, isNewUser = false) => {
  dispatch(setLoading(true));
  try {
    const response = isNewUser ?
      await API.users.createUser(data) :
      await API.auth.login(data);

    if (response.error) {
      dispatch(setError({message: response.error}));
    } else {
      dispatch(setToken(response.data));
    }   

  } catch(error) {
    dispatch(setError({message: error.message}));
  } finally {
    dispatch(setLoading(false));
  }
};

const initialState = {
  users: [],
  currentUser: null,
  token: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setBalance(state, action) {
      state.currentUser.balance = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload.id_token;
    },
    logout(state, action) {
      return state = initialState;
    }
  }
});

export const { setUsers, setCurrentUser, setToken, logout, setBalance } = usersSlice.actions;
export { fetchUsers, fetchUser, fetchToken };

export default usersSlice.reducer;