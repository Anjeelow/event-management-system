'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        if (isSignUpModalOpen || isLoginModalOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = ''; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = ''; // Clean up when component unmounts
        };
    }, [isSignUpModalOpen, isLoginModalOpen]);

    return (
        <div className="flex justify-center shadow-md">
            <div
                className="w-full px-5 flex py-4 bg-white items-center justify-between"
                style={{ maxWidth: '64rem' }}
            >
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                    LOGO
                </h1>
                <div>
                    <div className="flex gap-10 text-black items-center">
                        <Link href="/events">Events</Link>
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
                    </div>
                </div>
            </div>

            {/* Log In Modal */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5">
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-5"
                    >
                        <div className="w-full flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-2">Log In</h2>
                            <p>
                                Not a member yet?{' '}
                                <button
                                    onClick={() => {
                                        setLoginModalOpen(false);
                                        setSignUpModalOpen(true);
                                    }}
                                    className="text-blue-700 underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                        <form className="flex flex-col gap-2">
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full mb-3 p-2 border rounded"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold">Password</h4>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full mb-3 p-2 border rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                            >
                                Submit
                            </button>
                        </form>
                        <button
                            onClick={() => setLoginModalOpen(false)}
                            className="mt-4 text-red-600 underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Sign Up Modal */}
            {isSignUpModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5">
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-5"
                    >
                        <div className="w-full flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-2">Sign Up</h2>
                            <p>
                                Already a member?{' '}
                                <button
                                    onClick={() => {
                                        setSignUpModalOpen(false);
                                        setLoginModalOpen(true);
                                    }}
                                    className="text-blue-700 underline"
                                >
                                    Log In
                                </button>
                            </p>
                        </div>
                        <form className="flex flex-col gap-2">
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full mb-3 p-2 border rounded"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold">Password</h4>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full mb-3 p-2 border rounded"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold">Re-enter password</h4>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full mb-3 p-2 border rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                            >
                                Register
                            </button>
                        </form>
                        <button
                            onClick={() => setSignUpModalOpen(false)}
                            className="mt-4 text-red-600 underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
