'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ModeToggle } from '../components/Mode-toogle';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../app/features/auth/authSelector'; // Ensure this path is correct
import { logout } from '../app/features/auth/authSlice'; // Ensure this path is correct
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const user = useSelector(selectUser); // Get the current user from Redux state
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      dispatch(logout()); // Dispatch logout action first
      localStorage.removeItem('token'); // Then remove token
       router.push('/home'); // Navigate after state is updated and token is removed
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  return (
    <div className="my-2 p-2">
      <nav className='flex justify-between items-center'>
        <ul className='flex flex-grow justify-center gap-2'>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          {user && (
            <li>
              <Link href={'/dashboard'}>Dashboard</Link>
            </li>
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
