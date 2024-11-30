import { events } from '../../lib/placeholder-data';
import Image from "next/image";
import Link from "next/link";

export default function BrowseEvents() {
    return (
        <div className="bg-white px-2 py-5 md:px-24 bg-gray-100">
            <div className="flex pb-4 space-x-5">
                <h1>Browsing Events in your area</h1>
                <h1 className="text-gray-600">San Francisco, CA</h1>
            </div>
            <div className="grid gap-10 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {events.map(event => (
                    <Link 
                    href="/" 
                    key={event.id} 
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
                        <p className="text-gray-700 font-light">{event.date}</p>
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-gray-600">Hosted by: {event.host}</p>
                        <p className="text-blue-700">{event.attending} going</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
