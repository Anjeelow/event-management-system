"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Event, Category } from "../../../server/lib/definitions";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import { useRouter } from "next/navigation";

export default function BrowseEvents() {
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<{ month: string; day: string }>({
    month: "",
    day: "",
  });
  const [category, setCategory] = useState<string>("");
  const [categoryID, setCategoryID] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const { isAuthenticated, userId } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error("Error fetching events:", error));
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
    fetch("http://localhost:8080/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.category))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSearchPress = () => {
    const queryParams = new URLSearchParams({
      title: searchTitle || "",
      location: location || "",
      date: date ? date.toString() : "",
      category: categoryID ? categoryID.toString() : "",
    });
    fetch(
      "http://localhost:8080/api/events/search?".concat(queryParams.toString())
    )
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error("Error fetching events:", error));
  };
  // todo: send an express query once search button is pressed

  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTitle(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setLocation(e.target.value);

  const handleDateChange = (type: "month" | "day", value: string) =>
    setDate((prev) => ({ ...prev, [type]: value }));

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCategoryID(e.target.selectedIndex);
  };

  const handleMyEventsClick = () => {
    router.push("/my-events");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex bg-gray-100 justify-center min-h-screen">
      <div className="px-5 py-5 space-y-2 w-full" style={{ maxWidth: "76rem" }}>
        <div className="flex mb-4">
          {isAuthenticated && (
            <button
              onClick={() => handleMyEventsClick()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              My Events
            </button>
          )}
        </div>
        <div className="p-5 bg-white rounded-t-lg">
          <div className="grid gap-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select
                  value={location}
                  onChange={handleLocationChange}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option> </option>
                  <option>San Francisco, CA</option>
                  <option>New York, NY</option>
                  <option>Los Angeles, CA</option>
                  <option>Chicago, IL</option>
                </select>
                <select
                  value={date.month}
                  onChange={(e) => handleDateChange("month", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month.toString()}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={date.day}
                  onChange={(e) => handleDateChange("day", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month.toString()}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_name}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
          </div>
        </div>
        <div className="flex flex-col bg-white p-5 gap-5 justify-content align-center">
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => {
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
    </div>
  );
}
