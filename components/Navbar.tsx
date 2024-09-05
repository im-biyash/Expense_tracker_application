"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/Mode-toogle";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store"; // Adjust the path accordingly
import { login, logout } from "../app/features/auth/authSlice";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Invalid token:", e);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken && Date.now() < decodedToken.exp * 1000 && decodedToken.username && decodedToken.email) {
        dispatch(login({ username: decodedToken.username, email: decodedToken.email, token }));
      } else {
        localStorage.removeItem('token');
        dispatch(logout());
      }
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      dispatch(logout());
      router.push('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className=" p-2 bg-gray-100 dark:bg-gray-900 shadow">
      <nav className="flex justify-between items-center">
        <ul className="flex flex-grow justify-center gap-6 font-serif ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/developer">Developer</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/transcationlogs">Transcation logs</Link>
              </li>
            </>
          )}
        </ul>
        <div className="flex gap-2 p-2 mr-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <Button variant="default">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="default">Signup</Button>
              </Link>
            </>
          ) : (
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
        <div className="flex-shrink-0 mr-2 sm:mr-5">
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
