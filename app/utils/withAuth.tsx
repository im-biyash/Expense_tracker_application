import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the path to your store

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Loading state
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setLoading(false); // Set loading to false once authentication is checked
      }
    }, [isAuthenticated, router]);

    // Render a loading indicator while checking authentication
    if (loading) {
      return <div>Loading...</div>; // or use a spinner/loading component
    }

    // Only render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  // Add display name for better debugging in React DevTools
  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
