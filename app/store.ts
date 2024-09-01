// /src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // Use relative path as needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
