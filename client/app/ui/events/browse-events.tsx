'use client'
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react"
import { Event } from '@/app/lib/definitions'

export default function BrowseEvents() {

    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        fetch('http://localhost:8080/api/events')
            .then(response => response.json())
            .then(data => setEvents(data.events))
            .catch(error => console.error('Error fetching data:', error))
    }, [])

    return (
        <div className="bg-white px-2 py-5 md:px-24 bg-gray-100">
            <div className="flex pb-4 space-x-5">
                <h1>Browsing Events in your area</h1>
                <h1 className="text-gray-600">San Francisco, CA</h1>
            </div>
            <div>
                {events ? (
                    events.map((event, index) => (
                        <Link 
                            href="/" 
                            key={event.event_id} 
                            className="shadow-lg pb-5 mb-4 rounded-lg overflow-hidden w-full"
                            >
                            <Image 
                                src="/main-events.png"
                                alt="event with many balloons"
                                width={500}
                                height={500}
                                className="w-full object-cover rounded-t-lg"
                            />
                            <div className="px-2 pt-2 h-1/4">
                                <p className="text-gray-700 font-light">Date</p>
                                <h3 className="font-bold">{event.title}</h3>
                                <p className="text-gray-600">Hosted by: Host</p>
                                <p className="text-blue-700">going</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No events available.</p>
                )}
            </div>
        </div>
    )
}