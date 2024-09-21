import React, { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/authStore";
import { parseJwt } from '../utils/parseJwt';
 

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, adminRequired = false) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { token, role, login, isLoggedIn } = useAuthStore(); // Use Zustand

    useEffect(() => {
      const checkAuth = async () => {
        if (typeof window === "undefined") return;

        if (token) {
          try {
            const decodedToken = parseJwt(token);
            if (decodedToken && decodedToken.exp > Date.now() / 1000) {
              login({
                username: decodedToken.username,
                email: decodedToken.email,
                token,
                role: decodedToken.role,
              });

              if (adminRequired && role !== "admin") {
                router.push("/dashboard");
              } else {
                setLoading(false);
              }
            } else {
              localStorage.removeItem("token");
              router.push("/login");
            }
          } catch (error) {
            localStorage.removeItem("token");
            router.push("/login");
          }
        } else {
          router.push("/login");
        }
      };

      checkAuth();
    }, [token, login, router, role, adminRequired]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthComponent;
};

export default withAuth;
