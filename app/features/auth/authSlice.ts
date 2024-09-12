import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string | null;
  email: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

// Function to get initial state from local storage (client-side only)
const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    // Return default values if running on the server
    return {
      username: null,
      email: null,
      token: null,
      isLoggedIn: false,
    };
  }

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

      if (typeof window !== 'undefined' && token) {
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

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
