import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from '../../networkers';
import { logout } from './users';


const fetchTransactionsThunk = createAsyncThunk(
  'transactions/fetchTransactionsThunk',
  async (data) => {
    try {
      const response = await API.transactions.getTransactionsList(data);
      return response;
    } catch(error) {
      return {error: error.message};
    }    
  }
);

const createTransactionsThunk = createAsyncThunk(
  'transactions/createTransactionsThunk',
  async (data) => {
    try {
      const response = await API.transactions.createTransaction(data);
      return response;
    } catch(error) {
      return {error: error.message};
    }    
  }
);

const initialState = {
  transactions: [],
  loading: false,
  error: {
    message: ''
  }
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = {message: ''};
    }
  },
  extraReducers: {
    [logout]: (state, action) => {
      return state = initialState;
    },
    [fetchTransactionsThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTransactionsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      if ('data' in action.payload) {
        state.transactions = action.payload.data.trans_token;
        state.error = {message:''};
      } else {
        state.transactions = [];
        state.error = {message: action.payload.error};
      }
    },
    [fetchTransactionsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = {message: action.payload.error};
    },
    [createTransactionsThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [createTransactionsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      if ('data' in action.payload) {
        state.transactions = [ ...state.transactions, action.payload.data.trans_token];
        state.error = {message:''};
      } else {
        state.transactions = [];
        state.error = {message: action.payload.error};
      }
    },
    [createTransactionsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = {message: action.payload.error};
    }
  }
});

export const { clearError } = transactionsSlice.actions;
export { fetchTransactionsThunk, createTransactionsThunk };

export default transactionsSlice.reducer;