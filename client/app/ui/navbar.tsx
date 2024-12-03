'use client'

import Link from "next/link"

export default function Navbar() {
    return (
        <div className="flex justify-center shadow-md">
            <div className="w-full px-5 flex py-4 bg-white items-center align-center justify-between" style={{maxWidth: '64rem'}}>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                LOGO
                </h1>
                <div>
                    <div className="flex gap-10 text-black items-center">
                        <Link href='/events'>Events</Link>
                        <Link href='/'>Log In</Link>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}