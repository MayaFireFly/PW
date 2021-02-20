import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './slices/ui';
import usersReducer from './slices/users';
import transactionsReducer from './slices/transactions';


export default configureStore({
  reducer: {
    ui: uiReducer,
    users: usersReducer,
    transactions: transactionsReducer
  }
});
