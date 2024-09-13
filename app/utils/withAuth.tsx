import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login } from '../features/auth/authSlice';
import { parseJwt } from '../utils/parseJwt';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, adminRequired = false) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
    const role = useSelector((state: RootState) => state.auth.role);

    useEffect(() => {
      const checkAuth = async () => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = parseJwt(token);
            if (decodedToken && decodedToken.exp > Date.now() / 1000) {
              dispatch(login({ username: decodedToken.username, email: decodedToken.email, token, role: decodedToken.role }));
              if (adminRequired && role !== 'admin') {
                router.push('/dashboard');
              } else {
                setLoading(false);
              }
            } else {
              localStorage.removeItem('token');
              router.push('/login');
            }
          } catch (error) {
            localStorage.removeItem('token');
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      };

      checkAuth();
    }, [dispatch, router, role]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
