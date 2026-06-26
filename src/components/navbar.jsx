import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-max flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SN</span>
          </div>
          <h1 className="text-xl font-bold text-[#F97316] hidden sm:block">
            StudyNook
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-dark hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/rooms"
            className="text-dark hover:text-primary transition-colors"
          >
            Rooms
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/add-room"
                className="text-dark hover:text-primary transition-colors"
              >
                Add Room
              </Link>
              <Link
                to="/my-listings"
                className="text-dark hover:text-primary transition-colors"
              >
                My Listings
              </Link>
              <Link
                to="/my-bookings"
                className="text-dark hover:text-primary transition-colors"
              >
                My Bookings
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span className="text-dark font-semibold">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
              >
                <MdLogout /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-dark text-2xl"
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border py-4">
          <div className="container-max flex flex-col gap-4">
            <Link
              to="/"
              className="text-dark hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="text-dark hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rooms
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/add-room"
                  className="text-dark hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Room
                </Link>
                <Link
                  to="/my-listings"
                  className="text-dark hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  to="/my-bookings"
                  className="text-dark hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
              </>
            )}

            <div className="pt-4 border-t border-border flex flex-col gap-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2 border-2 border-[#F97316] text-[#F97316] rounded-lg text-center hover:bg-[#F97316] hover:text-white transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <MdLogout /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}