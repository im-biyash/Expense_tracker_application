'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/Mode-toogle";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { login, logout } from "../app/features/auth/authSlice";
import { FaBars } from "react-icons/fa";
import { parseJwt } from "../app/utils/parseJwt"; // Import only the utility function

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
  }, []);

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
    <div className="p-2 bg-gray-100 dark:bg-gray-900 shadow">
      <nav className="flex justify-between items-center">
        <div className="text-2xl">Logo</div>
        {/* Center the links on small screens */}
        <ul className="flex flex-grow justify-center gap-6 font-serif">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/developer">Developer</Link></li>
          {isLoggedIn && (
            <>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/transcationlogs">Transaction logs</Link></li>
            </>
          )}
        </ul>
        <div className="hidden md:flex gap-2 p-2 mr-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login"><Button variant="default">Login</Button></Link>
              <Link href="/signup"><Button variant="default">Signup</Button></Link>
            </>
          ) : (
            <Button variant="default" onClick={handleLogout}>Logout</Button>
          )}
        </div>
        <div className="md:flex-shrink-0 mr-9 items-center">
          <ModeToggle />
        </div>
        <div className="md:hidden absolute right-4">
          <button onClick={toggleMenu}>
            <FaBars className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>
      {/* Show menu when isMenuOpen is true */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 mt-4">
          <li className="py-2"><Link href="/">Home</Link></li>
          <li className="py-2"><Link href="/developer">Developer</Link></li>
          {!isLoggedIn && (
            <>
              <li className="py-2"><Link href="/login">Login</Link></li>
              <li className="py-2"><Link href="/signup">Signup</Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
             <li className="py-2"><Link href="/">Home</Link></li>
             <li className="py-2"><Link href="/developer">Developer</Link></li>
              <li className="py-2"><Link href="/dashboard">Dashboard</Link></li>
              <li className="py-2"><Link href="/transcationlogs">Transaction logs</Link></li>
              <li className="py-2"><Button onClick={handleLogout}>Logout</Button></li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
