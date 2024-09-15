"use client";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../store";
import Transcationform from "@/components/Transcationform";
import DoughnutChart from "@/components/DoughnutChart";
import withAuth from "../utils/withAuth";


const fetchTransactions = async (): Promise<any[]> => {
  const url = "https://expense-tracker-application-backend.onrender.com";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) throw new Error("You must be logged in to view transactions.");

  const response = await axios.get(`${url}/api/transaction/get`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.data);
  return response.data.transactions;
};

const Dashboard = () => {
  const username = useSelector((state: RootState) => state.auth.username);

<<<<<<< HEAD
  // React Query hook to fetch transactions
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  // Optimized calculations for income, expense, and investment
  const totals = transactions.reduce(
    (acc, transaction) => {
      switch (transaction.type) {
        case "income":
          acc.income += transaction.amount;
          break;
        case "expense":
          acc.expense += transaction.amount;
          break;
        case "investment":
          acc.investment += transaction.amount;
          break;
        default:
          break;
=======
  const url = "https://expense-tracker-application-backend.onrender.com"

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          setError("You must be logged in to view transactions.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${url}/api/transaction/get`,
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
>>>>>>> 609680c64bf9980ef0e40cb11a05aa46452f7e71
      }
      return acc;
    },
    { income: 0, expense: 0, investment: 0 }
  );

<<<<<<< HEAD
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </p>
    );
=======
    fetchTransactionData();
  }, [income]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
>>>>>>> 609680c64bf9980ef0e40cb11a05aa46452f7e71

  return (
    <div className="flex flex-col min-h-[100vh] p-4">
      {/* Welcome message at the top */}
      <div className="mb-6 mx-auto">
        <h1 className="text-2xl font-serif text-red-400">
          Welcome, {username}
        </h1>
      </div>

      {/* Flex container for form and chart */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-evenly gap-2">
        {/* Transcationform comes first in mobile view */}
        <div className="flex flex-col gap-2 mb-2 md:mb-0">
          <Transcationform />
        </div>

        {/* DoughnutChart will appear beside Transcationform in larger view */}
        <div className="flex flex-col gap-2 mt-8 justify-center">
          <DoughnutChart
            income={totals.income}
            expense={totals.expense}
            investment={totals.investment}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
