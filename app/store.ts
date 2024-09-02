import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import transactionsReducer from './features/userTranscations/transactionSlice'; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
