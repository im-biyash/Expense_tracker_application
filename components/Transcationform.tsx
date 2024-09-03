import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { selectUserId } from "../app/features/auth/authSelector"; // Adjust the import path as needed
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

const Transcationform = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const userId = useSelector(selectUserId); // Get the user ID from Redux state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      setError("User not authenticated.");
      return;
    }
  
    // Retrieve the token from local storage or wherever it's stored
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Debug token retrieval
    
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/transaction/add",
        {
          amount,
          type,
          description,
          date,
          userId // Include userId in the request payload
        },
        {
          headers: {
            'Authorization': `Bearer ${token}` // Make sure 'Bearer ' is correctly prefixed
          }
          
        }
      );
  
      console.log(response.data); // Check what the backend returns
  
      if (response.status === 201) {
        setSuccess("Transaction saved successfully");
        toast("Transaction created successfully");
        setAmount("");
        setType("");
        setDescription("");
        setDate("");
      } else {
        setError("Failed to save the transaction");
      }
    } catch (error: any) {
      setLoading(false);
      // Enhanced error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error Response:", error.response);
        setError(error.response.data?.msg || "An error occurred. Please try again.");
      } else if (error.request) {
        // No response was received
        console.error("Error Request:", error.request);
        setError("No response received from server. Please try again.");
      } else {
        // Something else happened
        console.error("Error Message:", error.message);
        setError("An error occurred. Please try again.");
      }
    }
  };
  
  const handleShowAllTransactions = () => {
    router.push("/transcationhistory"); // Redirect to TransactionHistory page
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
                <DropdownMenuItem onClick={() => setType("Expense")}>
                  Expense
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType("Saving")}>
                  Saving
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
              placeholder="Enter date"
              type="date"
              className="border-gray-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Save Transaction
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
