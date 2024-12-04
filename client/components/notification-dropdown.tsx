'use client';

interface Notification {
    id: number;
    text: string;
}

const NotificationsDropdown: React.FC = () => {
    const notifications: Notification[] = [
        { id: 1, text: 'New event created!' },
        { id: 2, text: 'Your RSVP was accepted.' },
        { id: 3, text: 'Reminder: Event tomorrow at 10 AM.' },
    ];

    {/*TO BE CHANGED WHEN DATA IS AVAILABLE*/}
    return (
        <div className="absolute top-10 p-2 right-0 w-48 bg-white border border-gray-300 shadow-md rounded-lg z-30">
            {notifications.length ? (
                notifications.map((notif) => (
                    <div>
                        <p
                            key={notif.id}
                            className="px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            {notif.text}
                        </p>
                    </div>
                ))
            ) : (
                <p className="px-4 py-2 text-sm text-gray-500">
                    No notifications
                </p>
            )}

            {notifications.length > 2 && (
                <div className="flex justify-center">
                    <p className="text-blue-700 text-sm">See More</p>
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown;
