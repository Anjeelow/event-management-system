'use client'

import Link from "next/link"

export default function Navbar() {
    return (
        <div className="flex h-full py-4 justify-around bg-white items-center">
            <h1 className="text-black">Event Management System</h1>
            <div>
                <div className="flex gap-10 text-black items-center">
                    <Link href='/'>Events</Link>
                    <Link href='/'>Log In</Link>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">Sign Up</button>
                </div>
            </div>
        </div>
    )
}