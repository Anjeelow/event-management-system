'use client'

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
        <div>
            {events ? (
                events.map((event, index) => (
                    <h1 key={index}>{event.address}</h1>
                ))
            ) : (
                <p>No events available.</p>
            )}
        </div>
    )
}