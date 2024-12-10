'use client'

import Image from "next/image";
import Link from "next/link";
import { User, Event, Category } from "../../../server/lib/definitions";
import { AuthContext } from "../authContext";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";

export default function MyEvents() {

    const [users, setUsers] = useState<User[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const { isAuthenticated, userId } = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {
        fetch("http://localhost:8080/api/events")
          .then((response) => response.json())
          .then((data) => setEvents(data.events))
          .catch((error) => console.error("Error fetching events:", error));
        fetch("http://localhost:8080/api/users")
          .then((response) => response.json())
          .then((data) => setUsers(data.users))
          .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const myEvents = events.filter((event) => event.organizer === userId)

    const handleGoBack = () => {
        router.back()
    }

    return (
        <div className="flex bg-gray-100 justify-center min-h-screen">
            <div className="px-5 py-5 space-y-2 w-full" style={{ maxWidth: "64rem" }}>
            <button onClick={() => handleGoBack()} className="flex text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">
              Go Back
            </button>
            {Array.isArray(events) && events.length > 0 ? (
                myEvents.map((event) => {
                const host = users?.find(
                    (user) => user.user_id === event?.organizer
                );

                return (
                    <Link
                    href={`/eventdetails/${event.event_id}`}
                    key={event.event_id}
                    className="flex flex-col border sm:flex-row gap-2 bg-white p-2 shadow-lg rounded-lg overflow-hidden"
                    >
                    <Image
                        src="/main-events.png"
                        alt="event with many balloons"
                        width={250}
                        height={250}
                        className="w-full sm:w-[250px] h-full object-cover rounded-lg"
                    />
                    <div className="px-2">
                        <p className="text-gray-700 font-light">
                        {new Date(event.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                        </p>
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-gray-600">
                        Hosted by: {host?.first_name} {host?.last_name}
                        </p>
                        <p className="text-blue-700">
                        {event.attendee_count} going
                        </p>
                    </div>
                    </Link>
                );
                })
            ) : (
                <div className="col-span-full text-center py-5 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800">
                    No events available
                </h2>
                <p className="text-gray-600">
                    Check back later for more events in your area.
                </p>
                </div>
            )}
            </div>
        </div>
    )
}