"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../features/userTranscations/transactionSlice";
import { selectTransactions } from "../features/userTranscations/transactionSelector"; // Create a selector to get transactions from the state

const transactionHistory = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/transcation/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setTransactions(response.data.transactions));
      } catch (error) {
        console.error("Fetch Transactions Error:", error);
      }
    };

    fetchTransactions();
  }, [dispatch]);

  return (
    <div>
      <h1>Transaction History</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} -{" "}
            {transaction.description} - {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default transactionHistory;
