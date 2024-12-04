'use client'

import BottomNavbar from "@/app/ui/bottomnavbar";
import { useState, useEffect } from "react";
import { User, Event, Rsvp } from "../../../../server/lib/definitions";
import { useParams } from "next/navigation";

import {
  IoLocationOutline,
  IoCalendarClearOutline,
  IoTimeOutline,
  IoPeople,
} from "react-icons/io5";

export default function EventDetails() {
  
  const params = useParams();
  const [events, setEvents] = useState<Event[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [rsvps, setRsvps] = useState<Rsvp[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(response => response.json())
      .then(data => setEvents(data.events))
      .catch(error => console.error('Error fetching events:', error))

    fetch('http://localhost:8080/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.users))
      .catch(error => console.error('Error fetching users:', error))

    fetch('http://localhost:8080/api/rsvps')
      .then(response => response.json())
      .then(data => setRsvps(data.rsvps))
      .catch(error => console.error('Error fetching rsvps:', error))
  }, [])

  const event = events?.find(
    (event) => event.event_id === Number(params.event_id)
  );
  const organizer = users?.find((user) => user.user_id === event?.organizer);
  const eventRSVPs = rsvps?.filter((rsvp) => rsvp.event_id === event?.event_id);
  const attendees = (eventRSVPs || [])
    .map((rsvp) => users?.find((user) => user.user_id === rsvp.user_id))
    .filter(Boolean);

  const startDate = event?.start_time ? new Date(event.start_time) : null;
  const endDate = event?.end_time ? new Date(event.end_time) : null;

  const startDateString = startDate?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  const endDateString = 
    startDate?.getDay() !== endDate?.getDay()
      ? endDate?.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : endDate?.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })

  if (!event) return <div className="flex flex-col items-center p-5 gap-5">
                    <div className="w-full mt-5 col-span-full text-center py-5 bg-white shadow-lg rounded-lg" style={{ maxWidth: "64rem" }}>
                      <h2 className="text-2xl font-semibold text-gray-800">Event Not Found</h2>
                      <p className="text-gray-600">Check back later for more events in your area.</p>
                    </div>
                  </div>;


  return (
    <div>
      <div className="flex justify-center bg-gray pb-20 h-auto">
        <div
          className="flex flex-col px-5 gap-5 py-5 w-full"
          style={{ maxWidth: "64rem" }}
        >
          <div
            className="relative rounded-xl  xl:m-0 w-full h-[300px] flex items-end p-5 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.7)), url("/main-events.png")`,
            }}
          >
            <div className="text-white">
              <h1 className="font-bold text-4xl  leading-tight m-0">
                {event.title}
              </h1>
              <p className="font-medium text-2xl m-0">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-[3fr_2fr] xl:grid-cols-[4fr_2fr]">
            <div className="flex flex-col gap-5">
              <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
                <h1 className="text-lg font-semibold">About this event</h1>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <IoCalendarClearOutline className="text-blue-500" />
                    <p>
                      {startDateString}{" — "}{endDateString}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <IoLocationOutline className="text-blue-500" />
                    <p>{event.address}</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <IoTimeOutline className="text-blue-500" />
                    <p>
                      {Math.trunc(event.duration / 60)} hours,{" "}
                      {event.duration % 60} minutes
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">{event.description}</p>
              </div>
              <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
                <h1 className="text-lg font-semibold">Organizer</h1>
                <div className="bg-gray-100 inline-flex flex-col items-center justify-center p-4 rounded-lg border">
                  <div
                    className="min-h-[50px] min-w-[50px] rounded-full border border-blue-700 bg-center"
                    style={{
                      backgroundImage: 'url("/main-events.png")',
                      backgroundSize: "cover",
                    }}
                  />
                  <p>
                    {organizer?.first_name} {organizer?.last_name}
                  </p>
                  <p className="text-gray-600">Host</p>
                </div>
              </div>
            </div>
            <div className="h-auto border bg-white shadow-lg p-5 rounded-lg">
              <div>
                <div className="flex flex-row items-center gap-2">
                  <IoPeople />
                  <h1 className="text-lg font-semibold">Attendees</h1>
                  <p className="text-gray-600">
                    {event.attendee_count}/{event.max_attendees}
                  </p>
                </div>
                {attendees.length > 0 ? (
                  attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 flex flex-row items-center p-4 rounded-lg border gap-2 my-2"
                    >
                      <div
                        className="min-h-[50px] min-w-[50px] rounded-full border border-blue-700 bg-center"
                        style={{
                          backgroundImage: 'url("/main-events.png")',
                          backgroundSize: "cover",
                        }}
                      />
                      <div>
                        <p>
                          {attendee?.first_name} {attendee?.last_name}
                        </p>
                        <p className="text-gray-600">
                          Registered{" "}
                          {attendee?.created_at &&
                          !isNaN(new Date(attendee?.created_at).getTime())
                            ? new Date(attendee.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : "Invalid date"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Attendees</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BottomNavbar />
      </div>
    </div>
  );
}
