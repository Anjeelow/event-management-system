'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import LoginModal from '../../components/login-modal'; 
import SignUpModal from '../../components/signup-modal';  
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '../authContext';

export default function Navbar() {

    const { isAuthenticated, handleLogout } = useContext(AuthContext)
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [userId, setUserId] = useState<number | undefined>(undefined)

    return (
        <div className="flex justify-center shadow-md">
            <div
                className="w-full px-5 flex py-4 bg-white items-center justify-between"
                style={{ maxWidth: '64rem', height: '60px' }}
            >
                <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                    LOGO
                </Link>
                <div>
                    <div className="flex gap-10 text-black items-center">
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
