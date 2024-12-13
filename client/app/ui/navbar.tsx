"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import LoginModal from "../../components/login-modal";
import SignUpModal from "../../components/signup-modal";
import {
  IoSearch,
  IoMenu,
  IoCalendarClearOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoClose,
} from "react-icons/io5";
import { AuthContext } from "../authContext";
import { useSearch } from "../searchContext";
import axios from "axios";

export default function Navbar() {
  const { filters, setFilters, updateEvents } = useSearch();
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, title: e.target.value });
  };

  const date = 2;

  const handleSearchPress = () => {
    const fetchEvents = async () => {
      const queryParams = new URLSearchParams({
        title: filters.title || "",
        location: filters.location || "",
        date: date ? date.toString() : "",
        categoryID: filters.categoryID ? filters.categoryID.toString() : "",
      });

      try {
        const response = await axios.get(
          `http://localhost:8080/api/events/search?${queryParams.toString()}`
        );
        const events = response.data.events || [];
        updateEvents(events);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };

    fetchEvents();
  };
  return (
    <div className="flex justify-center shadow-md relative z-50">
      <div
        className="w-full px-5 py-4 bg-white shadow-b-md"
        style={{ maxWidth: "76rem", height: "auto" }}
      >
        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div
            className="z-10 absolute w-1/3 top-20 right-0 bg-white p-4 flex flex-col items-start gap-5 sm:hidden shadow-lg"
            style={{
              overflow: "hidden",
              zIndex: 10,
              position: "absolute",
            }}
          >
            <Link
              className="flex gap-2 items-center text-sm font-medium"
              href="/events"
              onClick={() => setMenuOpen(false)}
            >
              <IoCalendarClearOutline />
              Events
            </Link>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="flex gap-2 items-center text-sm font-medium"
                >
                  Log In
                </button>

                <button
                  onClick={() => {
                    setSignUpModalOpen(true);
                    setMenuOpen(false);
                  }}
                  type="button"
                  className="flex gap-2 items-center text-sm font-medium"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <Link
                  className="flex gap-2 items-center text-sm font-medium"
                  href="/notifications"
                  onClick={() => setMenuOpen(false)}
                >
                  <IoNotificationsOutline />
                  Notifications
                </Link>
                <Link
                  className="flex gap-2 items-center text-sm font-medium"
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  <IoPersonOutline />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  type="button"
                  className="flex gap-2 items-center text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 rounded-lg px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
        <div className="relative grid grid-cols-[1fr_0fr] sm:grid-cols-[4fr_5fr] space-x-2 items-center">
          <div className="flex flex-row gap-5 items-center z-50">
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
              LOGO
            </h1>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="text-sm font-medium w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleSearchChange}
              />
              <button
                onClick={handleSearchPress}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400"
              >
                <IoSearch size={20} />
              </button>
            </div>
          </div>
          {/* Full-size navigation */}
          <div className="hidden w-full sm:flex gap-6 text-black items-center sm:justify-end">
            <Link className="text-sm font-medium" href="/events">
              Events
            </Link>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="text-sm font-medium"
                >
                  Log In
                </button>

                <button
                  onClick={() => setSignUpModalOpen(true)}
                  type="button"
                  className="text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 rounded-lg px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <Link className="text-sm font-medium" href="/notifications">
                  Notifications
                </Link>
                <Link className="text-sm font-medium" href={`/profile`}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 rounded-lg px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile menu icon */}
          <button
            className="sm:hidden text-black flex align-center justify-center z-50"
            onClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Log In Modal */}
      {isLoginModalOpen && (
        <LoginModal
          setLoginModalOpen={setLoginModalOpen}
          setSignUpModalOpen={setSignUpModalOpen}
        />
      )}

      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <SignUpModal
          setSignUpModalOpen={setSignUpModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}
    </div>
  );
}
