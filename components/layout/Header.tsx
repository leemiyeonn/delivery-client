import React from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/auth/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <header className="bg-white">
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300"
        >
          Delivery22 🛒
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/stores"
            className="text-lg text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Stores
          </Link>
          <Link
            href="/cart"
            className="text-lg text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Cart
          </Link>
          <Link
            href="/orders"
            className="text-lg text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Orders
          </Link>
          {isAuthenticated ? (
            <>
              {/* <Link
                href="/profile"
                className="text-lg text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Profile
              </Link> */}
              <button
                onClick={handleLogout}
                className="text-lg text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-lg text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
        <button className="md:hidden focus:outline-none">
          <svg
            className="h-8 w-8 fill-current text-gray-600"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
