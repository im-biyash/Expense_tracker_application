import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string | null;
  email: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

// Function to get initial state from local storage
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  return {
    username: token ? localStorage.getItem('username') : null,
    email: token ? localStorage.getItem('email') : null,
    token: token,
    isLoggedIn: !!token,
  };
};

const initialState: AuthState = getInitialState();

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

      // Store the data in local storage
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username || '');
        localStorage.setItem('email', email || '');
      }
    },
    logout(state) {
      state.username = null;
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;

      // Remove the data from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
