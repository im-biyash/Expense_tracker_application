"use client"
import React from 'react';
import withAuth from '../utils/withAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store'
import Transcationform from '@/components/Transcationform';
const Dashboard = () => {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <div className='flex items-center justify-evenly min-h-[90vh] p-6 '>
     
      <h1 className='text-3xl text-rose-900'>Welcome {username}</h1>
      <Transcationform/>
  
    </div>
  );
};

export default withAuth(Dashboard);
