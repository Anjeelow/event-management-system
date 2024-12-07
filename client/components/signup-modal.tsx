'use client';

import axios from "axios";
import { useState } from "react";

export default function SignUpModal({ 
    setSignUpModalOpen, 
    setLoginModalOpen,
    setIsAuthenticated
}: { 
    setSignUpModalOpen: (open: boolean) => void, 
    setLoginModalOpen: (open: boolean) => void, 
    setIsAuthenticated: (authenticated: boolean) => void
}) {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [reEnterPassword, setReEnterPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!firstName || !lastName || !email || !password || !reEnterPassword) {
            setError('All fields are required')
            return
        }

        if (password !== reEnterPassword) {
            setError("Passwords don't match")
            return
        }

        try {
            const response = await axios.post('http://localhost:8080/api/signup', { firstName, lastName, email, password })
            localStorage.setItem('token', response.data.token)
            setIsAuthenticated(true)
            setSuccess(response.data.message)
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setReEnterPassword('')
            setSignUpModalOpen(false)
        } catch (error: any) {
            setError(
                error.response?.data?.message || 'An unexpected error occurred. Please try again'
            )
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 shadow-lg w-96 flex flex-col gap-5">
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
                <form className="flex flex-col gap-2" onSubmit={handleSignup}>
                    <div>
                        <h4 className="font-bold">First Name</h4>
                        <input
                            type="text"
                            name="first-name"
                            placeholder="First Name"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Last Name</h4>
                        <input
                            type="text"
                            name="last-name"
                            placeholder="Last Name"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Email</h4>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Re-enter password</h4>
                        <input
                            type="password"
                            name="re-enter-password"
                            placeholder="Password"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setReEnterPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
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
    );
}
