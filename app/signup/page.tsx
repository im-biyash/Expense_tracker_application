// Import statements
"use client";
import axios
 from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/user/signup', {
        username,
        email,
        password
      });
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        alert("User created successfully");
        dispatch(login({ username, email, token: res.data.token || '' }));
        router.push('/dashboard');
      } else {
        setError(res.data.msg || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error("Signup API Error:", error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
            <p>Already have an account? <a href="/login">Login</a></p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
