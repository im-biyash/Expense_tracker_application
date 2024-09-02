"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelector'; // Ensure this path is correct
import withAuth from '../utils/withAuth'; // Adjust the path as needed
import Transcationform from '@/components/Transcationform';

const Dashboard = () => {
  const user = useSelector(selectUser); // Access the current user from Redux state

  return (
    <div className='flex items-center justify-evenly min-h-[90vh] p-6 '>
      <h1>Welcome {user?.username}</h1>
      <Transcationform/> {/* Display the logged-in user's username */}
    </div>
  );
};

export default withAuth(Dashboard);
