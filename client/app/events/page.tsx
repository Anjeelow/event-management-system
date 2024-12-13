"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Event, Category } from "../../../server/lib/definitions";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "../ui/loadingSpinner";

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
  const [loading, setLoading] = useState(true)

  const { isAuthenticated, userId } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // setMounted(true);
    // fetch("http://localhost:8080/api/events")
    //   .then((response) => response.json())
    //   .then((data) => setEvents(data.events))
    //   .catch((error) => console.error("Error fetching events:", error));
    // fetch("http://localhost:8080/api/users")
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data.users))
    //   .catch((error) => console.error("Error fetching users:", error));
    // fetch("http://localhost:8080/api/category")
    //   .then((response) => response.json())
    //   .then((data) => setCategories(data.category))
    //   .catch((error) => console.error("Error fetching categories:", error));
    const fetchData = async () => {
      try {
        setMounted(true)
        const [eventsResponse, usersResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/events'),
          axios.get('http://localhost:8080/api/users'),
          axios.get('http://localhost:8080/api/category'),
        ])

        const currentDate = new Date()

        const activeEvents = eventsResponse.data.events.filter((event: any) => new Date(event.closed_at) >= currentDate)

        setEvents(activeEvents)
        setUsers(usersResponse.data.users)
        setCategories(categoriesResponse.data.category)
      } catch (error) {
        console.log('Error fetching data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []);

  const handleSearchPress = () => {
      const fetchEvents = async () => {
        const queryParams = new URLSearchParams({
          title: searchTitle || "",
          location: location || "",
          date: date ? date.toString() : "",
          category: categoryID ? categoryID.toString() : "",
        });
        
        try {
          const response = await axios.get(`http://localhost:8080/api/events/search?${queryParams.toString()}`)
          const events = response.data.events || []
          setEvents(events)
      
        } catch (error) {
          console.log('Error fetching events:', error)
        }
    }

    fetchEvents()
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

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex bg-gray-100 justify-center min-h-screen">
      <div className="px-5 py-5 space-y-2 w-full" style={{ maxWidth: "76rem" }}>
        <div className="grid md:grid-cols-[2fr_5fr] gap-5">
          <div className="
            w-full flex flex-col space-y-5 md:sticky sm:self-start bg-white p-4 rounded-lg shadow-md"
          >    
          <div className="space-y-2 sm:space-y-2 max-sm:min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 sm:space-y-2 max-sm:min-w-[250px]">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="flex space-x-2">
              <select 
                className="w-1/2 p-2 border rounded-md"
                onChange={(e) => handleDateChange('month', e.target.value)}
              >
                <option value="">Month</option>
                {['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select 
                className="w-1/2 p-2 border rounded-md"
                onChange={(e) => handleDateChange('day', e.target.value)}
              >
                <option value="">Day</option>
                {Array.from({length: 31}, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day.toString()}>{day}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-2 max-sm:min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              onChange={handleLocationChange}
            >
              <option value="">All Locations</option>
              {/* NO DATA :( */}
            </select>
          </div>

          <div className="w-full self-end">
            <button 
              onClick={handleSearchPress}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
          <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
            <div className="">
              {isAuthenticated && (
                <h3 className="text-lg font-semibold">Browse Events</h3>
              )}
            </div>
            <div className="bg-white rounded-t-lg">

            </div>
            <div className="flex flex-col bg-white pb-5 gap-2 justify-content align-center">
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event) => {
                  const host = users?.find(
                    (user) => user.user_id === event?.organizer
                  );

                  return (
                    <Link
                      href={`/event-details/${event.event_id}`}
                      key={event.event_id}
                      className="flex flex-row border gap-2 bg-white p-2 shadow-lg rounded-lg overflow-hidden"
                    >
                      <Image
                        src="/main-events.png"
                        alt="event with many balloons"
                        width={250}
                        height={250}
                        className="w-[200px] h-full object-cover rounded-lg"
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
      </div>
    </div>
  );
}
