'use client';

import axios from "axios";
import { useState } from "react";

export default function LoginModal({ 
    setLoginModalOpen, 
    setSignUpModalOpen, 
    setIsAuthenticated 
}: { 
    setLoginModalOpen: (open: boolean) => void, 
    setSignUpModalOpen: (open: boolean) => void 
    setIsAuthenticated: (authenticated: boolean) => void
}) {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError('All fields are required')
            return
        }

        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password })
            console.log(response)
            localStorage.setItem('token', response.data.token)
            setIsAuthenticated(true)
            setSuccess(response.data.message)
            setEmail('')
            setPassword('')
            setLoginModalOpen(false)
        } catch (error: any) {
            setError(
                error.response?.data?.message || 'An unexpected error occured. Please try again'
            )
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 shadow-lg w-96 flex flex-col gap-5">
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
                <form className="flex flex-col gap-2" onSubmit={handleLogin}>
                    <div>
                        <h4 className="font-bold">Email</h4>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Password</h4>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
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
    );
}
