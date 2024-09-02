import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    username: string;
    email: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; email: string; token: string }>) => {
            state.user = {
                username: action.payload.username,
                email: action.payload.email,
            };
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
