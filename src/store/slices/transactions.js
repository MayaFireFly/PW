import { createSlice } from '@reduxjs/toolkit';

import API from '../../networkers';
import { setLoading, setError } from './ui';
import { logout } from './users';


const fetchTransactions = async (dispatch, data) => {
  dispatch(setLoading(true));
  try {
    const response = await API.transactions.getTransactionsList(data);

    if (response.error) {
      dispatch(setError(response.error));
    } else {
      dispatch(setTransactions(response.data));
    } 

  } catch(error) {
    dispatch(setError(error));
  } finally {
    setLoading(false);
  }
};

const createTransaction = async (dispatch, data) => {
  dispatch(setLoading(true));
  try {
    const response = await API.transactions.createTransaction(data);

    if (response.error) {
      dispatch(setError(response.error));
    } else {
      dispatch(addTransaction(response.data));
    } 

  } catch(error) {
    dispatch(setError(error));
  } finally {
    setLoading(false);
  }
};

const initialState = {
  transactions: []
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
    addTransaction(state, action) {
      state.transactions = [ ...state.addTransaction, action.payload ];
    }
  },
  extraReducers: {
    [logout]: (state, action) => {
      return state = initialState;
    }
  }
});

export const { setTransactions, addTransaction } = transactionsSlice.actions;
export { fetchTransactions, createTransaction };

export default transactionsSlice.reducer;