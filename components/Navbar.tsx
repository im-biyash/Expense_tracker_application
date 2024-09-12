"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/Mode-toogle";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { login, logout } from "../app/features/auth/authSlice";
import { FaBars } from "react-icons/fa";
import { parseJwt } from "../app/utils/parseJwt";
import mylogo from "../app/assets/mylogo.png";
import Image from "next/image";
import { RingLoader } from "react-spinners";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prevOpen: boolean) => !prevOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      if (
        decodedToken &&
        Date.now() < decodedToken.exp * 1000 &&
        decodedToken.username &&
        decodedToken.email
      ) {
        dispatch(
          login({
            username: decodedToken.username,
            email: decodedToken.email,
            token,
          })
        );
      } else {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      dispatch(logout());

      // Simulate a delay to show the loader
      setTimeout(() => {
        router.push("/");
        setIsMenuOpen(false);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Logout Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-2 bg-gray-100 dark:bg-gray-900 shadow relative">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <RingLoader color="#36d68f" size={150} speedMultiplier={1.5} />
        </div>
      )}

      <nav className="flex justify-between items-center">
        <div className="text-2xl">
          <Image src={mylogo} alt="Logo" width={60} height={60} />
        </div>
        <ul className="hidden md:flex flex-grow justify-center gap-6 font-serif">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/transcationlogs">Transaction logs</Link>
              </li>
            </>
          )}
        </ul>
        <div className=" flex items-center gap-4">
          <ModeToggle />
          <button
            onClick={toggleMenu}
            className="hover:text-blue-500 transition-colors duration-300"
          >
            <FaBars className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 mt-4">
          <li
            className="py-2 hover:text-blue-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="py-2 hover:text-blue-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/about">About</Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li
                className="py-2"
                onClick={() => {
                  router.push("/login");
                  setIsMenuOpen(false);
                }}
              >
                <Button variant="default">Login</Button>
              </li>
              <li
                className="py-2"
                onClick={() => {
                  router.push("/signup");
                  setIsMenuOpen(false);
                }}
              >
                <Button variant="default">Signup</Button>
              </li>
            </>
          ) : (
            <>
              <li
                className="py-2 hover:text-blue-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li
                className="py-2 hover:text-blue-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/transcationlogs">Transaction logs</Link>
              </li>
              <li className="py-2">
                <Button variant="default" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
