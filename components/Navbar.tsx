'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ModeToggle } from '../components/Mode-toogle';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store'; // Adjust the path accordingly
import { login, logout } from '.././app/features/auth/authSlice';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login({token}));
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
    <div className="my-2 p-2">
      <nav className="flex justify-between items-center">
        <ul className="flex flex-grow justify-center gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
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
