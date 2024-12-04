'use client';

import { IoNotifications, IoGrid } from 'react-icons/io5';
import { useState } from 'react';
import Link from 'next/link';
import NotificationsDropdown from '../../components/notification-dropdown';

export default function UserNavbar() {
    const [isNotifOpen, setNotifOpen] = useState<boolean>(false);

    return (
        <div className="flex justify-center shadow-md">
            <div
                className="w-full px-5 flex py-4 bg-white items-center justify-between"
                style={{ maxWidth: '64rem', height: '60px' }}
            >
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                    LOGO
                </h1>
                <div>
                    <div className="flex gap-10 text-black items-center">
                        <Link
                            href={"/"}
                            className="flex flex-col items-center gap-1">
                                <IoGrid />
                                <p className="text-xs">Event Dashboard</p>
                        </Link>
                        <div className="relative flex flex-col items-center gap-1">
                            <button
                                onClick={() => setNotifOpen(!isNotifOpen)}
                                className="text-black"
                            >
                                <IoNotifications />
                            </button>
                            <p className="text-xs">Notifications</p>

                            {isNotifOpen && <NotificationsDropdown />}
                        </div>
                        <Link
                            href={"/"}
                            className="h-9 w-9 flex items-center justify-center rounded-full border border-blue-700 overflow-hidden"
                        >
                            <div
                                className="h-full w-full bg-center bg-cover"
                                style={{
                                    backgroundImage: 'url("/main-events.png")',
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
