"use client";
import React, { ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the path to your store

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    // Only render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
