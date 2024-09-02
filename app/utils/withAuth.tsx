import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelector'; // Ensure this path is correct

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedComponent = (props: any) => {
    const router = useRouter();
    const user = useSelector(selectUser); // Get the current user from Redux state

    useEffect(() => {
      if (!user) {
        
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [user, router]);

    // If user is not logged in, do not render the wrapped component
    if (!user) return null;

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
