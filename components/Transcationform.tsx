import React, { useState } from "react";
import axios from "axios";

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
