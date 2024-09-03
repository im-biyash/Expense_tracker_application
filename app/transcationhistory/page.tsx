"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserId } from '../features/auth/authSelector'; // Adjust import path as needed

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  description: string;
  date: string; // Use Date if you're dealing with Date objects
}

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const userId = useSelector(selectUserId); // Get the user ID from Redux state

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) {
        setError('User not authenticated.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/api/transaction/user/${userId}`);
        setTransactions(response.data);
      } catch (error: any) {
        console.error('Error fetching transactions:', error.response);
        setError('An error occurred while fetching transactions.');
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <div>
      <h1>Transaction History</h1>
      {error && <p className="text-red-500">{error}</p>}
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Type</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.description}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
