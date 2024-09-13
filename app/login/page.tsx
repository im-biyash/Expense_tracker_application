"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RingLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "../features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        { email, password }
      );
  
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        const { username, email, token, role } = response.data;
  
        // Only access localStorage if in the browser environment
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }
  
        // Dispatch login action with username, email, token, and role
        dispatch(login({ username, email, token }));
  
        if (role === 'admin') {
          router.push('/adminDashboardPage');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(response.data.msg || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      setError(error.response?.data?.msg || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear the error when user types
    setter(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <RingLoader color="#36d68f" size={150} speedMultiplier={1.5} />
        </div>
      )}

      {!loading && (
        <Card className="w-80 h-[400px] rounded-xl border-blue-300 p-2">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <h1 className="p-1">Email</h1>
              <Input
                placeholder="Enter your email"
                aria-label="Email input"
                className="border-gray-500"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </CardContent>
            <CardContent>
              <h1 className="p-1">Password</h1>
              <Input
                placeholder="Enter your password"
                aria-label="Password input"
                className="border-gray-500"
                type="password"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
            </CardContent>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <CardFooter className="flex flex-col w-full gap-2 justify-center">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
              <p className="text-center">
                Don&apos;t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
              </p>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Login;
