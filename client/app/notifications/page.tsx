import { notifications, events } from "../../../server/placeholder-data";

export default function Notifications() {
    return (
        <div className="flex bg-gray-100 justify-center min-h-screen">
            <div className="px-5 py-5 space-y-2 w-full" style={{ maxWidth: "64rem" }}>
                <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Notifications</h1>
                    <p className="text-sm self-end">Mark all as read</p>
                </div>
                    {Array.isArray(notifications) && notifications.length > 0 ? (
                        notifications.map((notification, index) => {
                            const event = events?.find(
                                (event) => event.event_id === notification?.event_id
                            );

                            const bgClass =
                                notification.status === "unread"
                                    ? "bg-blue-50"
                                    : "bg-white";

                            return (
                                <div
                                    key={notification?.notification_id || index}
                                    className={`flex flex-row pt-2 pl-2 space-x-2 border-b-2 last:border-none pb-4 ${bgClass} hover:bg-blue-100 transition-colors duration-200`}
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
