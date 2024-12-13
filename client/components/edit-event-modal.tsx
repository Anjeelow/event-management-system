'use client';

import { AuthContext } from "@/app/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CalendarInput from "./date-picker";
import { Event, Rsvp } from "../../server/lib/definitions";
import { rsvps } from "../../server/placeholder-data";
import { RxCross1 } from "react-icons/rx";
import { LiaEdit } from "react-icons/lia";

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

        if (start === null || end === null) {
            setError('Start and end times are required')
            return
        }
        
        const startDate = new Date(start)
        const endDate = new Date(end)

        if (startDate >= endDate) {
            setError('Cannot end an event before it even started')
            return
        }

        try {
            // const response = await axios.post('http://localhost:8080/api/events/edit', { eventId, title, description, start, end, address, maxAttendees })
            console.log(eventId)
            await Promise.all([
                axios.post('http://localhost:8080/api/events/edit', {
                    eventId,
                    title,
                    description,
                    start,
                    end,
                    address,
                    maxAttendees
                }),
                axios.post('http://localhost:8080/api/events/notify', {
                    eventId,
                    message: `The event has been edited. Please check the updated details`,
                }),
            ])

            setFetchTime(true)
            console.log('success')
            setEditModalOpen(false)
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
            <div className="bg-white p-6 pb-12 shadow-lg w-96 flex flex-col">
                <div className="flex justify-end cursor-pointer">
                    <RxCross1 onClick={() => setEditModalOpen(false)} />
                </div>
                <div className="w-full flex flex-col items-center">
                    <LiaEdit size={35} className="text-xl font-bold mb-2">Edit</LiaEdit>
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
                            className="w-full p-2 border rounded"
                            style={{maxHeight: "150px"}}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 text-sm">
                        <div>
                            <h4 className="font-bold">Start</h4>
                            <CalendarInput 
                                date={start}
                                setDate={setStart}
                            />
                        </div>
                        <div className="mb-3">
                            <h4 className="font-bold">End</h4>
                            <CalendarInput 
                                date={end} 
                                setDate={setEnd} 
                            />
                        </div>
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
                        Edit
                    </button>
                </form>
            </div>
        </div>
    );
}
