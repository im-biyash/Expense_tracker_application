"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import Shadcn UI Table components

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  description: string;
  date: string;
}

const Page = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view transactions.");
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get("http://localhost:3001/api/transaction/get", {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          });

          const fetchedTransactions = response.data.transactions || []; // Fallback to an empty array
          setTransactions(fetchedTransactions);
        } catch (error: any) {
          console.error("Fetch Transactions Error:", error);
          setError("An error occurred while fetching transactions.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : transactions.length === 0 ? (
            <p className="text-center">No transactions found.</p>
          ) : (
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
                  {transactions.map((transaction) => (
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
          )}
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
