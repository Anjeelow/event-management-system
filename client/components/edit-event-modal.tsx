'use client';

import { AuthContext } from "@/app/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CalendarInput from "./date-picker";
import { Event } from "../../server/lib/definitions";

export default function EditModal({ 
    setEditModalOpen,
    currentEvent,
    setFetchTime
}: { 
    setEditModalOpen: (open: boolean) => void,
    currentEvent: any,
    setFetchTime: (fetchTime: boolean) => void
}) {

    const eventId = currentEvent.event_id
    const { setIsAuthenticated, setUserId } = useContext(AuthContext)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [start, setStart] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)
    const [address, setAddress] = useState<string>('')
    const [maxAttendees, setMaxAttendees] = useState<number | string>(1)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        setTitle(currentEvent.title)
        setDescription(currentEvent.description)
        setStart(currentEvent.start_time)
        setEnd(currentEvent.end_time)
        setAddress(currentEvent.address)
        setMaxAttendees(currentEvent.max_attendees)
    }, [])

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8080/api/events/edit', { eventId, title, description, start, end, address, maxAttendees })
            setFetchTime(true)
            console.log('success')
        } catch (error: any) {
            setError(
                error.response?.data?.message || 'An unexpected error occurred. Please try again'
            )
        }
    }

    const handleZero = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
    
        if (value === "") {
            return;
        }

        const numericValue = Number(value);
    
        if (numericValue > 0) {
            setMaxAttendees(numericValue);
        } else if (numericValue === 0 && maxAttendees !== 0) {
            return;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 shadow-lg w-96 flex flex-col gap-5">
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">Edit</h2>
                </div>
                <form className="flex flex-col gap-2" onSubmit={handleEdit}>
                    <div>
                        <h4 className="font-bold">Title</h4>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Description</h4>
                        <textarea
                            name="description"
                            value={description}
                            placeholder="Description"
                            className="w-full mb-3 p-2 border rounded"
                            style={{maxHeight: "150px"}}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Start</h4>
                        <CalendarInput 
                            date={start}
                            setDate={setStart}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">End</h4>
                        <CalendarInput 
                            date={end} 
                            setDate={setEnd} 
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Address</h4>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            placeholder="Address"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Max Attendees</h4>
                        <input
                            type="number"
                            name="max-attendees"
                            value={maxAttendees === "" ? "" : maxAttendees}
                            min="1"
                            placeholder={String(maxAttendees)}
                            className="w-full mb-3 p-2 border rounded placeholder-gray-400"
                            onChange={(e) => handleZero(e)}
                        />
                    </div>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={() => setEditModalOpen(false)}
                    className="mt-4 text-red-600 underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
