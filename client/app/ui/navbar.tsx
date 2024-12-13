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
=======
import { useContext, useState } from 'react';
import Link from 'next/link';
import LoginModal from '../../components/login-modal'; 
import SignUpModal from '../../components/signup-modal';  
import { IoSearch, IoMenu, IoCalendarClearOutline, IoNotificationsOutline, IoPersonOutline, 
        IoClose, IoPersonCircleOutline, IoAdd, IoLogOutOutline, IoSettingsOutline, IoPersonCircle,
        IoPersonAddOutline, IoFileTray}
        from 'react-icons/io5';
import { AuthContext } from '../authContext';
import { useSearch } from "../searchContext";
import Image from 'next/image';

export default function Navbar() {
    const { filters, setFilters, updateEvents } = useSearch();
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Function to close all dropdowns
    const closeAllDropdowns = () => {
        setMenuOpen(false);
        setProfileDropdownOpen(false);
    };
                  
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
        <div className="flex justify-center shadow-md relative z-30">
            <div
                className="w-full px-5 py-4 bg-white shadow-b-md"
                style={{ maxWidth: '76rem', height: 'auto' }}
            >
                <div className="relative grid grid-cols-[1fr_0fr] sm:grid-cols-[3fr_5fr] md:grid-cols-[4fr_5fr] space-x-2 items-center">
                    <div className='flex flex-row gap-5 items-center z-40'>
                        <Link href='/' className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                            LOGO
                        </Link>
                      
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
                    <div className="hidden w-full sm:flex gap-6 text-gray-700 items-center sm:justify-end pr-2 relative">
                        <Link className="text-sm flex flex-col items-center" href="/events">
                            <IoCalendarClearOutline size={20}/>
                            Browse Events
                        </Link>
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => setLoginModalOpen(true)}
                                    className="text-sm flex flex-col items-center"
                                >
                                    <IoPersonOutline size={18}/>
                                    Log In
                                </button>

                                <button
                                    onClick={() => setSignUpModalOpen(true)}
                                    type="button"
                                    className="text-sm flex flex-col items-center"
                                >
                                    <IoPersonAddOutline size={18}/>
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    className="text-sm flex flex-col items-center" 
                                    href="/create-event"
                                >
                                    <IoAdd size={18}/>
                                    Create Event
                                </Link>
                                <Link 
                                    className="text-sm flex flex-col items-center" 
                                    href="/notifications"
                                    >
                                    <IoNotificationsOutline size={18}/>
                                    Notifications
                                </Link>
                                <div className="relative">

                                    {/*Account Image???????????? */}
                                    <button 
                                        onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="text-sm flex flex-col items-center"
                                    >
                                        <IoPersonOutline size={18}/>
                                        <p>Profile</p>
                                    </button>
                                    {/**------------------------- */}

                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40">

                                            <div className='border-b'>
                                                <Link 
                                                    href="/my-events" 
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                    onClick={() => setProfileDropdownOpen(false)}
                                                >
                                                    <IoFileTray size={18}/>
                                                    My Events
                                                </Link>
                                            </div>

                                            <div>
                                                <Link 
                                                    href="/profile" 
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                    onClick={() => setProfileDropdownOpen(false)}
                                                >
                                                    <IoPersonCircleOutline size={18}/>
                                                    View Profile
                                                </Link>
                                                <Link 
                                                    href="/account-settings" 
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                    onClick={() => setProfileDropdownOpen(false)}
                                                >
                                                    <IoSettingsOutline size={18}/>
                                                    Account Settings
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setProfileDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                >
                                                    <IoLogOutOutline size={18}/>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile menu icon */}
                    <div className="relative sm:hidden">
                        <button
                            className="text-gray-700 flex align-center justify-center z-40"
                            onClick={() => {
                                setMenuOpen(!isMenuOpen);
                                // Close profile dropdown if menu is opened
                                setProfileDropdownOpen(false);
                            }}
                        >
                            {isMenuOpen ? (<IoClose size={24} />) : (<IoMenu size={24} />)}
                        </button>

                        {/* Mobile dropdown */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                                <Link 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" 
                                    href="/events" 
                                    onClick={closeAllDropdowns}
                                >
                                    <IoCalendarClearOutline size={18}/>
                                    Browse Events
                                </Link>
                                {!isAuthenticated ? (
                                    <>
                                        <div className='border-b'>
                                        </div>
                                        <button
                                            onClick={() => {
                                                closeAllDropdowns();
                                                setLoginModalOpen(true);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <IoPersonOutline size={18}/>
                                            Log In
                                        </button>

                                        <button
                                            onClick={() => {
                                                closeAllDropdowns();
                                                setSignUpModalOpen(true);
                                            }}
                                            type="button"
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <IoPersonAddOutline size={18}/>
                                            Sign Up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className='border-b'>
                                            <Link 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" 
                                                href="/createevent" 
                                                onClick={closeAllDropdowns}
                                            >
                                                <IoAdd size={18}/>
                                                Create Event
                                            </Link>
                                            <Link 
                                                href="/myevents" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                <IoFileTray size={18}/>
                                                My Events
                                            </Link>
                                        </div>
                                        <div className='border-b'>
                                            <Link 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" 
                                                href="/notifications" 
                                                onClick={closeAllDropdowns}
                                            >
                                                <IoNotificationsOutline size={18}/>
                                                Notifications
                                            </Link>
                                        </div>
                                        <div>
                                            <Link 
                                                href="/profile" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                <IoPersonCircleOutline size={18}/>
                                                View Profile
                                            </Link>
                                            <Link 
                                                href="/account-settings" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                <IoSettingsOutline size={18}/>
                                                Account Settings
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setProfileDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                            >
                                                <IoLogOutOutline size={18}/>
                                                Sign Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
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

