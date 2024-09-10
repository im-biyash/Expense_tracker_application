"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../utils/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Transcationform from "@/components/Transcationform";
import DoughnutChart from "@/components/DoughnutChart";

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = useSelector((state: RootState) => state.auth.username);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("You must be logged in to view transactions");
        }

        const response = await axios.get(
          "http://localhost:3001/api/transaction/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const transactions = response.data.transactions;

        // Calculate the totals for income, expense, and investment
        const totalIncome = transactions
          .filter((t: any) => t.type === "income")
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const totalExpense = transactions
          .filter((t: any) => t.type === "expense")
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const totalInvestment = transactions
          .filter((t: any) => t.type === "investment")
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        setIncome(totalIncome);
        setExpense(totalExpense);
        setInvestment(totalInvestment);
      } catch (error: any) {
        setError(error.response?.data?.msg || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col justify-center mt-4 md:flex-row md:items-center md:justify-evenly min-h-[90vh] p-6">
      {/* Transcationform comes first in mobile view */}
      <div className="flex flex-col gap-2 mb-2 md:mb-0">
        <Transcationform />
      </div>
      {/* DoughnutChart will appear below Transcationform in mobile view */}
      <div className="flex flex-col gap-2 mb-2">
        <DoughnutChart
          income={income}
          expense={expense}
          investment={investment}
        />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
