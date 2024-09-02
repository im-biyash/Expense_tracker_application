// authSelector.ts
import { RootState } from '../../store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserId = (state: RootState) => state.auth.user?.userId;
