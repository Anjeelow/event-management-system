'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import LoginModal from '../../components/login-modal'; 
import SignUpModal from '../../components/signup-modal';  
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '../authContext';
import { IoSearch } from 'react-icons/io5';

export default function Navbar() {

    const { isAuthenticated, handleLogout } = useContext(AuthContext)
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [userId, setUserId] = useState<number | undefined>(undefined)

    return (
        <div className="flex justify-center shadow-md">
           <div
                className="w-full px-5 py-4 bg-white"
                style={{ maxWidth: '64rem', height: 'auto' }}
            >
                <div className="grid md:grid-cols-2 space-y-2 md:space-y-0">

                    <div className='flex flex-row gap-5 items-center'>
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                            LOGO
                        </h1>
            
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                onClick={() => {}}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-400"
                            >
                                <IoSearch size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex gap-5 text-black items-center justify-between md:justify-end">
                        <Link href="/events">Events</Link>
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => setLoginModalOpen(true)}
                                    className="text-black"
                                >
                                    Log In
                                </button>

                                <button
                                    onClick={() => setSignUpModalOpen(true)}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/notifications">Notifications</Link>
                                <Link href={`/profile`}>Profile</Link>
                                <button
                                    onClick={handleLogout}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
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
