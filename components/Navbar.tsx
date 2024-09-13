
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ModeToggle } from '../components/Mode-toogle';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../app/store";// Adjust the path to your store
import { login, logout } from '../app/features/auth/authSlice';
import { FaBars } from 'react-icons/fa';
import { parseJwt } from '../app/utils/parseJwt';
import mylogo from '../app/assets/mylogo.png';
import Image from 'next/image';
import { RingLoader } from 'react-spinners';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if we are on the client side
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    setIsClient(true); // Set client-side flag
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
      setLoading(true); // Start loading
      localStorage.removeItem('token');
      dispatch(logout());
      setTimeout(() => {
        router.push('/');
        setIsMenuOpen(false); // Close menu after logout
        setLoading(false); // Stop loading
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error('Logout Error:', error);
      setLoading(false); // Stop loading on error
    }
  };

  // Render nothing on the server side until the client-side flag is set
  if (!isClient) {
    return null;
  }

  return (
    <div className="p-2 bg-gray-100 dark:bg-gray-900 shadow relative">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <RingLoader color="#36d68f" size={150} speedMultiplier={1.5} />
        </div>
      )}

      <nav className="flex justify-between items-center">
        <div className="text-2xl">
          <Image src={mylogo} alt="Logo" width={60} height={60} />
        </div>
        <ul className="hidden md:flex flex-grow justify-center gap-6 font-serif">
          <li className="hover:text-blue-500 transition-colors duration-300">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 transition-colors duration-300">
            <Link href="/about">About</Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="hover:text-blue-500 transition-colors duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-blue-500 transition-colors duration-300">
                <Link href="/transcationlogs">Transaction logs</Link>
              </li>
            </>
          )}
        </ul>
        <div className="hidden md:flex gap-2 p-2 mr-3">
          {!isLoggedIn ? (
            <>
              <Button variant="default" onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button variant="default" onClick={() => router.push('/signup')}>
                Signup
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:text-blue-500 transition-colors duration-300">
            <FaBars className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 mt-4">
          <li className="py-2 hover:text-blue-500 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
            <Link href="/">Home</Link>
          </li>
          <li className="py-2 hover:text-blue-500 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
            <Link href="/about">About</Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="py-2" onClick={() => { router.push('/login'); setIsMenuOpen(false); }}>
                <Button variant="default">Login</Button>
              </li>
              <li className="py-2" onClick={() => { router.push('/signup'); setIsMenuOpen(false); }}>
                <Button variant="default">Signup</Button>
              </li>
            </>
          ) : (
            <>
              <li className="py-2 hover:text-blue-500 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="py-2 hover:text-blue-500 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                <Link href="/transcationlogs">Transaction logs</Link>
              </li>
              <li className="py-2">
                <Button variant="default" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
