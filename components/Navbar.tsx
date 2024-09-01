'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ModeToggle } from '../components/Mode-toogle';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../app/features/auth/authSelector'; // Ensure the path is correct
import { logout } from '../app/features/auth/authSlice'; // Ensure the path is correct

const Navbar = () => {
  const user = useSelector(selectUser); // Get the current user from Redux state
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token'); // Remove token from local storage
    dispatch(logout()); // Dispatch logout action
  };
  
  return (
    <div className="my-2 p-2">
      <nav className='flex justify-between items-center'>
        <ul className='flex flex-grow justify-center gap-2'>
          <Link href={'/'}>
            <li>Home</li>
          </Link>
          {user && (
            <Link href={'/dashboard'}>
              <li>Dashboard</li>
            </Link>
          )}
        </ul>
        <div className='flex gap-2 p-2 mr-3'>
          {!user ? (
            <>
              <Link href={'/login'}>
                <Button variant="default">Login</Button>
              </Link>
              <Link href={'/signup'}>
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
