'use client'

import { useContext, useEffect, useState } from "react";
import { Notification } from "../../../server/lib/definitions";
import axios from "axios";
import { AuthContext } from "../authContext";
import { Event } from "../../../server/lib/definitions";

export default function Notifications() {

    const { userId } = useContext(AuthContext)
    const [events, setEvents] = useState<Event[]>()
    const [notifications, setNotifications] = useState<Notification[]>()
    const filteredNotifications = notifications
        ?.filter((notification) => notification.user_id === userId)
        .reverse()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const notificationsResponse = await axios.get('http://localhost:8080/api/notifications')
                const [notificationsResponse, eventsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/notifications'),
                    axios.get('http://localhost:8080/api/events'),
                ])

                setNotifications(notificationsResponse.data.notifications)
                setEvents(eventsResponse.data.events)
            } catch (error) {
                console.error('Error fetching notifications', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex bg-gray-100 justify-center min-h-screen">
            <div className="px-5 py-5 space-y-2 w-full" style={{ maxWidth: "76rem" }}>
                <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Notifications</h1>
                    <p className="text-sm self-end">Mark all as read</p>
                </div>
                    {Array.isArray(filteredNotifications) && filteredNotifications.length > 0 ? (
                        filteredNotifications?.map((notification, index) => {

                                const event = events?.find(
                                    (event) => event.event_id === notification.event_id
                                );

                                const bgClass =
                                    notification.status === "unread"
                                        ? "bg-blue-50"
                                        : "bg-white";

                                return (
                                    <div
                                        key={notification?.notification_id || index}
                                        className={`flex flex-row items-center p-3 space-x-3 border-b-2 last:border-none ${bgClass} hover:bg-blue-100 transition-colors duration-200`}
                                    >
                                        <div
                                            className="h-10 w-10 flex items-center justify-center rounded-sm border border-blue-700 overflow-hidden"
                                        >
                                            <div
                                                className="h-full w-full bg-center bg-cover"
                                                style={{
                                                    backgroundImage: 'url("/main-events.png")',
                                                }}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-[3fr_1fr] w-full">
                                            <div>
                                                <h2 className="font-regular">{event?.title}</h2>
                                                <p className="font-light">{notification.message}</p>
                                            </div>
                                            <div className="md:justify-self-end pr-2">
                                                <p className="text-sm text-gray-500">
                                                    {new Date(notification.sent_at).toLocaleString("en-PH", {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>                            
                                );
                            })
                    ) : (
                        <div>No notifications available.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
