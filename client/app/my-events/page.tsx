"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Event, Category } from "../../../server/lib/definitions";
import { AuthContext } from "../authContext";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import EditModal from "@/components/edit-event-modal";
import CreateModal from "@/components/create-event-modal";
import DeleteModal from "@/components/delete-event-modal";
import axios from "axios";
import LoadingSpinner from "../ui/loadingSpinner";

export default function MyEvents() {
  const [users, setUsers] = useState<User[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fetchTime, setFetchTime] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, userId } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEventParams = new URLSearchParams({
          userID: userId?.toString() || "",
        }).toString();

        const [eventsResponse, usersResponse, joinedEventsResponse] =
          await Promise.all([
            axios.get(
              `http://localhost:8080/api/events/search?${userEventParams}`
            ),
            axios.get("http://localhost:8080/api/users"),
            axios.post("http://localhost:8080/api/joined-events", { userId }),
          ]);

        const currentDate = new Date();

        const joinedEvents = joinedEventsResponse.data.joinedEvents;
        const joinedEventIds = new Set(
          joinedEvents.map((event: any) => event.event_id)
        );

        const activeEvents = eventsResponse.data.events.filter(
          (event: any) =>
            new Date(event.closed_at) >= currentDate &&
            !joinedEventIds.has(event.event_id)
        );

        const combinedEvents = joinedEvents.concat(activeEvents);
        console.log(combinedEvents);
        const sortedEvents = combinedEvents.sort((a, b) => {
          const startA = new Date(a.start_time).getTime();
          const startB = new Date(b.start_time).getTime();

          return startA - startB;
        });

        console.log(sortedEvents);
        setJoinedEvents(sortedEvents);
        setCreatedEvents(eventsResponse.data.events);
        setUsers(usersResponse.data.users);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setFetchTime(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchTime]);

  // const myEvents = events.filter((event) => event.organizer === userId);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex bg-gray-100 justify-center min-h-screen">
      <div className="px-5 py-5 space-y-2 w-full" style={{ maxWidth: "76rem" }}>
        <div className="grid xl:grid-cols-2 gap-5">
          <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
            {isAuthenticated ? (
              <div className="space-y-2 w-full" style={{ maxWidth: "76rem" }}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Handled Events</h3>
                </div>
                <div className="">
                  {Array.isArray(createdEvents) && createdEvents.length > 0 ? (
                    createdEvents.map((event) => {
                      const host = users?.find(
                        (user) => user.user_id === event?.organizer
                      );

                      return (
                        <Link
                          href={`/event-details/${event.event_id}`}
                          key={event.event_id}
                          className="flex flex-row border gap-2 bg-white p-2 shadow-lg rounded-lg mb-3"
                        >
                          <Image
                            src="/main-events.png"
                            alt="event with many balloons"
                            width={250}
                            height={250}
                            className="w-[200px] h-full object-cover rounded-lg"
                          />
                          <div className="px-2 flex flex-col flex-grow">
                            <p className="text-gray-700 font-light">
                              {event.start_time
                                ? new Date(event.start_time).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )
                                : "No date available"}
                            </p>
                            <h3 className="font-bold truncate">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 truncate">
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
                        Explore and join available events
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <h1>Sign In first</h1>
            )}
          </div>
          <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
            {isAuthenticated ? (
              <div className="space-y-2 w-full" style={{ maxWidth: "76rem" }}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Joined Events</h3>
                </div>
                <div className="">
                  {Array.isArray(joinedEvents) && joinedEvents.length > 0 ? (
                    joinedEvents.map((event) => {
                      const host = users?.find(
                        (user) => user.user_id === event?.organizer
                      );

                      return (
                        <Link
                          href={`/event-details/${event.event_id}`}
                          key={event.event_id}
                          className="flex flex-row border gap-2 bg-white p-2 shadow-lg rounded-lg mb-3"
                        >
                          <Image
                            src="/main-events.png"
                            alt="event with many balloons"
                            width={250}
                            height={250}
                            className="w-[200px] h-full object-cover rounded-lg"
                          />
                          <div className="px-2 flex flex-col flex-grow">
                            <p className="text-gray-700 font-light">
                              {event.start_time
                                ? new Date(event.start_time).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )
                                : "No date available"}
                            </p>
                            <h3 className="font-bold truncate">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 truncate">
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
                        Bring your ideas to life and create an event today
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <h1>Sign In first</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
