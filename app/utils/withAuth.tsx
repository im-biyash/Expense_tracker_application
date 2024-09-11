import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the path to your store

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Loading state
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
      // Redirect only after loading state has been set to false
      if (!loading) {
        if (!isAuthenticated) {
          router.push('/login');
        }
      } else {
        setLoading(false);
      }
    }, [isAuthenticated, router, loading]);

    // Render a loading indicator while checking authentication
    if (loading) {
      return <div>Loading...</div>; // or use a spinner/loading component
    }

    // Only render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;