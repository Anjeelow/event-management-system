'use client'
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react"
import { User, Event } from '../../server/lib/definitions'
import axios from "axios";

export default function BrowseEvents() {

    const [events, setEvents] = useState<Event[]>([])
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {     
                const [eventsResponse, usersResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/events'),
                    axios.get('http://localhost:8080/api/users'),
                ])

                const currentDate = new Date()

                const activeEvents = eventsResponse.data.events.filter((event: any) => new Date(event.closed_at) >= currentDate)

                setEvents(activeEvents)
                setUsers(usersResponse.data.users)

            } catch (error) {
                console.log('Error fetching data', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex justify-center">
            <div className="px-5 py-5 w-full" style={{ maxWidth: '76rem', height: 'auto' }}>
                <div className="flex pb-4 space-x-5">
                    <h1>Browsing Events in your area</h1>
                </div>
                <div className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {Array.isArray(events) && events.length > 0 ? (
                        events.map((event) => {
                            const organizer = events.find((user) => user.organizer === event.organizer);
                            const host = users.find((user) => organizer?.organizer === user.user_id);
                            
                            return (
                                <Link
                                    href={`/event-details/${event.event_id}`}
                                    key={event.event_id}
                                    className="bg-white border shadow-lg pb-5 overflow-hidden"
                                >
                                    <Image
                                        src="/main-events.png"
                                        alt="event with many balloons"
                                        width={500}
                                        height={500}
                                        className="w-full object-cover"
                                    />
                                    <div className="px-2 pt-2">
                                        <p className="text-gray-700 font-light">
                                            {event.start_time ? new Date(event.start_time).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            }) : 'No date available'}
                                        </p>
                                        <h3 className="font-bold">{event.title}</h3>
                                        <p className="text-gray-600">
                                            Hosted by: {host?.first_name} {host?.last_name}
                                        </p>
                                        <p className="text-blue-700">{event.attendee_count} going</p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-5 bg-white shadow-lg rounded-lg">
                            <h2 className="text-2xl font-semibold text-gray-800">No events available</h2>
                            <p className="text-gray-600">Check back later for more events in your area.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
}