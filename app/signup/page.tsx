'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RingLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const url = "https://expense-tracker-application-backend.onrender.com";

  // Signup function to make API call
  const signupFunction = async (data: { username: string; email: string; password: string }) => {
    const response = await axios.post(`${url}/api/user/signup`, data);
    return response.data;        
  };

  // Use mutation for handling signup
  const mutation = useMutation({
    mutationFn: signupFunction,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      router.push("/login"); // Redirect to login page
    },
           
    onError: (err: any) => {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "An error occurred");
      setLoading(false); // Stop loading on error
    },
    onMutate: () => {
      setLoading(true); // Start loading when mutation starts
    },
    onSettled: () => {
      setLoading(false); // Stop loading when mutation is settled
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic client-side validation
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    

    // Trigger the mutation with form data
    mutation.mutate({ username, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <RingLoader color="#36d68f" size={150} speedMultiplier={1.5} />
        </div>
      )}
      <Card className="w-80 h-[500px] rounded-xl border-blue-300 p-2">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <h1 className="p-1">Email</h1>
            <Input
              placeholder="Enter your email"
              className="border-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardContent>
          <CardContent>
            <h1 className="p-1">Username</h1>
            <Input
              placeholder="Enter your username"
              className="border-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </CardContent>
          <CardContent>
            <h1 className="p-1">Password</h1>
            <Input
              placeholder="Enter your password"
              className="border-gray-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardContent>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <CardFooter className="flex flex-col w-full gap-2 justify-center">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
