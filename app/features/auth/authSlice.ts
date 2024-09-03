import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string | null;
  email: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  username: null,
  email: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username?: string; email?: string; token?: string }>) {
      const { username = null, email = null, token = null } = action.payload || {};
      state.username = username;
      state.email = email;
      state.token = token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.username = null;
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
