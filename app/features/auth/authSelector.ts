// /src/features/auth/authSelectors.ts


import { RootState } from '../../store';

export const selectUser = (state: RootState) => state.auth.user;
