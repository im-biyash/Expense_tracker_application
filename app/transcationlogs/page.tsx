"use client";
import React from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you're using a Button component

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  description: string;
  date: string;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  const url = "https://expense-tracker-application-backend.onrender.com";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) throw new Error("You must be logged in to view transactions.");

  const response = await axios.get(`${url}/api/transaction/get`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.transactions;
};

const Page = () => {
  const { data: transactions, isLoading, isError, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions, // Fixed the duplicate queryFn issue
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error instanceof Error ? error.message : "An error occurred"}</p>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="mx-auto w-3/4">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base">Amount</TableHead>
                  <TableHead className="text-base">Type</TableHead>
                  <TableHead className="text-base">Description</TableHead>
                  <TableHead className="text-base">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="text-sm">{transaction.amount}</TableCell>
                    <TableCell className="text-sm">{transaction.type}</TableCell>
                    <TableCell className="text-sm">{transaction.description}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={() => window.history.back()} className="mx-auto">
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
