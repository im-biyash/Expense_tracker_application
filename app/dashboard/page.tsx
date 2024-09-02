"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelector'; // Ensure this path is correct
import withAuth from '../utils/withAuth'; // Adjust the path as needed

const Dashboard = () => {
  const user = useSelector(selectUser); // Access the current user from Redux state

  return (
    <div className=''>
      <h1>Welcome {user?.username}</h1> {/* Display the logged-in user's username */}
    </div>
  );
};

export default withAuth(Dashboard);
