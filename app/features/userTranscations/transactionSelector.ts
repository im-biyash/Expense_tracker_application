import { RootState } from '../../store'; // Adjust the import path if necessary

export const selectTransactions = (state: RootState) => state.transactions.transactions;
