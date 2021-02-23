import { createSlice } from '@reduxjs/toolkit';

import { logout } from './users';


const initialState = {
  loading: false,
  error: {
    message: ''
  },
  selectedTransaction: {}
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSelectedTransaction(state, action) {
      state.selectedTransaction = action.payload;
    }
  },
  extraReducers: {
    [logout]: (state, action) => {
      return state = initialState;
    }
  }
});


export const { setError, setLoading, setSelectedTransaction } = uiSlice.actions;
export default uiSlice.reducer;