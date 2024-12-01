import { events } from '../../../../server/placeholder-data';
import { users } from '../../../../server/placeholder-data';
import { IoLocationOutline, IoCalendarClearOutline, IoTimeOutline, IoPeople } from "react-icons/io5";

export default function EventDetails({ params }: { 
  params: { event_id: number } 
}) {
  if (!params) return <div>Loading...</div>;

  const event = events.find((event) => event.event_id === Number(params.event_id));
  const organizer = users.find(user => user.id === event?.organizer);

  if (!event) return <div>Event not found</div>;

  return (
    <div className="flex flex-col px-2 gap-5 md:px-24 bg-gray-100 py-5 h-auto">
        <div
            className="relative rounded-xl sm:mb-5 xl:m-0 w-full h-[300px] flex items-end p-5 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.7)), url("/main-events.png")`,
            }}
            >
            <div className="text-white">
                <h1 className="font-bold text-5xl  leading-tight m-0">{event.title}</h1>
                <p className="font-medium text-2xl m-0">
                    {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })}
                </p>
            </div>
        </div>
        <div className="grid gap-5 md:grid-cols-[3fr_2fr] xl:grid-cols-[4fr_1fr]">
            <div className='flex flex-col gap-5'>
                <div className="bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
                    <h1 className="text-lg font-semibold">About this event</h1>
                    <p className="text-gray-600">{event.desc}</p>
                    <div>
                        <div className='flex flex-row items-center gap-2'>
                            <IoCalendarClearOutline className='text-blue-500'/>
                            <p>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'long', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                })}
                            </p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <IoLocationOutline className='text-blue-500'/>
                            <p>{event.address}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <IoTimeOutline className='text-blue-500'/>
                            <p>{event.duration} minutes</p>
                        </div>    
                    </div>
                </div>
                <div className="bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
                    <h1 className='text-lg font-semibold'>Organizer</h1>
                    <div className='bg-gray-100 inline-flex flex-col items-center justify-center p-4 rounded-lg border'>
                        <div
                            className='h-[50px] w-[50px] rounded-full border border-blue-700'
                            style={{
                                backgroundImage: 'url("/main-events.png")',
                            }}
                        />
                        <p>{organizer?.first_name} {organizer?.last_name}</p>
                        <p className='text-gray-600'>Host</p>
                    </div>
                </div>
            </div>
            <div className='bg-white shadow-lg p-5 rounded-lg'>
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <IoPeople />
                        <h1 className='text-lg font-semibold'>Attendees</h1>
                        <p className='text-gray-600'>{event.attendee_count}/{event.max_attendees}</p>
                    </div>
                    <div className="bg-gray-100 flex flex-row items-center p-4 rounded-lg border gap-2">
                        <div
                            className="min-h-[50px] min-w-[50px] rounded-full border border-blue-700 bg-center"
                            style={{
                            backgroundImage: 'url("/main-events.png")',
                            backgroundSize: 'cover',
                            }}
                        />
                        <div>
                            <p>{organizer?.first_name} {organizer?.last_name}</p>
                            <p className='text-gray-600'>

                                {/* Used Organizer For Temp Display */}
                                Registered {organizer?.created_at && !isNaN(new Date(organizer?.created_at).getTime()) 
                                ? new Date(organizer?.created_at).toLocaleDateString('en-GB', { 
                                    day: '2-digit', 
                                    month: '2-digit', 
                                    year: 'numeric' 
                                    })
                                : 'Invalid date'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}