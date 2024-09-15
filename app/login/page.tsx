"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { useMutation } from "@tanstack/react-query";
import { RingLoader } from "react-spinners";

interface LoginRequestData {
  email: string;
  password: string;
}

interface LoginResponseData {
  username: string;
  email: string;
  token: string;
  role: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const url = "https://expense-tracker-application-backend.onrender.com";

  // Define the mutation function
  const loginFunction = async (data: LoginRequestData)  => {
    console.log("Login function called with data:", data); // Debug log
    const response = await axios.post<LoginResponseData>(`${url}/api/user/login`, data);
    console.log("Login response:", response.data); // Debug log
    return response.data;
  };

  // Use the mutation hook
  const mutation = useMutation({
    mutationFn: loginFunction,
    onSuccess: (data) => {
      console.log("Login successful with data:", data); // Debug log
      const { username, email, token, role } = data;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token); // Store token in localStorage
      }

      // Dispatch the login action
      dispatch(login({ username, email, token }));

      // Redirect based on user role
      if (role === "admin") {
        router.push("/adminDashboardPage");
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: Error) => {
      console.error("Login error:", error); // Debug log
      setError("An unexpected error occurred");
    },
  });

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with email:", email, "password:", password); // Debug log

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    setLoading(true); 
    mutation.mutate({ email, password });
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear the error when user types
    setter(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        // Display RingLoader while loading state is true
        <div className="flex justify-center items-center">
          <RingLoader size={150} color={"#123abc"} loading={loading} />
        </div>
      ) : (
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
              <Button type="submit" className="w-full">
                Login
              </Button>
              <p className="text-center">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Login;