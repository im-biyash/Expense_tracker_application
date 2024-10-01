
'use client'
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface TranscationFormProps {
  onSuccess: () => void; // Add onSuccess prop
}

const Transcationform: React.FC<TranscationFormProps> = ({ onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!amount || !type || !description || !date) {
      setError("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a transaction");
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post(
        "https://expense-tracker-application-backend.onrender.com/api/transaction/add",
        { amount, type, description, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.msg || "Transaction added successfully");
      // Call the onSuccess function to trigger a refetch
      onSuccess();

      setAmount("");
      setType("");
      setDescription("");
      setDate("");
    } catch (error: any) {
      setError(error.response?.data?.msg || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAllTransactions = () => {
    route.push("/transcationlogs");
  };

  return (
    <div>
      <Card className="w-80 h-[550px] rounded-xl border-black-300 p-2">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Transaction Form
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <h1>Total Amount</h1>
            <Input
              placeholder="Enter amount"
              className="border-gray-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </CardContent>
          <CardContent>
            <h1>Type</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full border border-gray-500 rounded">
                  <Input
                    placeholder="Select type"
                    className="cursor-pointer border-none"
                    value={type}
                    readOnly
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setType("expense")}>
                  Expense
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType("income")}>
                  Income
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType("investment")}>
                  Investment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
          <CardContent>
            <h1>Description</h1>
            <Input
              placeholder="Purpose"
              className="border-gray-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </CardContent>
          <CardContent>
            <h1>Date</h1>
            <Input
              placeholder="Enter date of transcations"
              type="date"
              className="border-gray-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Transaction"}
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={handleShowAllTransactions}
            >
              Show All Transactions
            </Button>
          </CardFooter>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
      </Card>
    </div>
  );
};

export default Transcationform;
