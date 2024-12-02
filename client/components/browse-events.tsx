'use client'
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react"
import { User, Event } from '../../server/lib/definitions'

export default function BrowseEvents() {

    const [events, setEvents] = useState<Event[]>([])
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        fetch('http://localhost:8080/api/events')
            .then(response => response.json())
            .then(data => setEvents(data.events))
            .catch(error => console.error('Error fetching events:', error))

        fetch('http://localhost:8080/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.users))
            .catch(error => console.error('Error fetching users:', error))
    }, [])

    return (
        <div className="px-2 py-5 md:px-24 bg-gray-100">
            <div className="flex pb-4 space-x-5">
                <h1>Browsing Events in your area</h1>
                <h1 className="text-gray-600">San Francisco, CA</h1>
            </div>
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {events ? (
                        events.map((event) => {
                            // Find the user by matching organizer ID
                            const organizer = events.find(user => user.event_id === event.organizer);
                            const host = users.find(user => organizer?.organizer === user.user_id)

                            return (
                                <Link 
                                    href={`/eventdetails/${event.event_id}`}
                                    key={event.event_id} 
                                    className="bg-white shadow-lg pb-5 rounded-lg"
                                >
                                    <Image 
                                        src="/main-events.png"
                                        alt="event with many balloons"
                                        width={500}
                                        height={500}
                                        className="w-full object-cover rounded-lg"
                                    />
                                    <div className="px-2 pt-2 h-1/4">
                                        <p className="text-gray-700 font-light">
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                        <h3 className="font-bold">{event.title}</h3>
                                        <p className="text-gray-600">Hosted by: {host?.first_name} {host?.last_name}</p>
                                        <p className="text-blue-700">{event.attendee_count} going</p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <p>No events available.</p>
                    )}
            </div>
        </div>
    )
}