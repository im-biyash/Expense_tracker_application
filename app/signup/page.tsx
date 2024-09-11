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
import { Button } from "@/components/ui/button";
import { RingLoader } from "react-spinners";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic client-side validation
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:3001/api/user/signup', {
        username,
        email,
        password,
      });

      // Handle successful signup
      console.log('Signup successful:', response.data);
      router.push('/login'); // Redirect to login page
    } catch (error: any) {
      console.error('Signup Error:', error);

      // Check if error response contains a message
      if (error.response && error.response.data) {
        setError(error.response.data.msg || 'An error occurred during signup');
      } else {
        setError('An error occurred during signup');
      }
    } finally {
      setLoading(false); // Stop loading
    }
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
            <Button type="submit" className="w-full">
              Register
            </Button>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
