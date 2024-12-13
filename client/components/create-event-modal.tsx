'use client';

import { AuthContext } from "@/app/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CalendarInput from "./date-picker";
import { Event } from "../../server/lib/definitions";
import { RxCross1 } from "react-icons/rx";
import { LiaEdit } from "react-icons/lia";

export default function CreateModal({ 
    setCreateModalOpen,
    setFetchTime
}: { 
    setCreateModalOpen: (open: boolean) => void
    setFetchTime: (fetchTime: boolean) => void
}) {

    const { userId } = useContext(AuthContext)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const msIn30Min = 30 * 60 * 1000;
    const roundedTime = new Date(Math.ceil(new Date().getTime() / msIn30Min) * msIn30Min);
    const [start, setStart] = useState<Date | null>(roundedTime)
    const [end, setEnd] = useState<Date | null>(roundedTime)
    const [address, setAddress] = useState<string>('')
    const [maxAttendees, setMaxAttendees] = useState<number>(1)
    const [attendeeCount, setAttendeeCount] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

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
    

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !description || start === null || end === null || !address || !maxAttendees) {
            setError('All fields are required')
            return
        }

        try {
            if ((maxAttendees ?? 0) < 1) {
                setError('Must have attendees for your event')
                return
            }
            const currentDay = new Date().toISOString()
            const duration = Math.floor(((end?.getTime() ?? 0) - (start?.getTime() ?? 0)) / 60000)
            const response = await axios.post('http://localhost:8080/api/events/create', { userId, title, description, start, end, duration, address, maxAttendees, attendeeCount, currentDay })
            setFetchTime(true)
            setSuccess('Successfully created an event')
            console.log('success')
            setError('')
            setCreateModalOpen(false)
        } catch (error: any) {
            setError(
                error.response?.data?.message || 'An unexpected error occurred. Please try again'
            )
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 pb-12 shadow-lg w-96 flex flex-col">
                <div className="flex justify-end cursor-pointer">
                    <RxCross1 onClick={() => setCreateModalOpen(false)} />
                </div>
                <div className="w-full flex flex-col items-center">
                    <LiaEdit size={35} className="text-xl font-bold mb-2">Edit</LiaEdit>
                </div>
                <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                    <div>
                        <h4 className="font-bold">Title</h4>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded"
                            required
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
                            required
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
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Max Attendees</h4>
                        <input
                            type="number"
                            name="max-attendees"
                            value={maxAttendees}
                            min="1"
                            placeholder="1"
                            className="w-full mb-3 p-2 border rounded placeholder-gray-400"
                            required
                            onChange={(e) => handleZero(e)}
                        />
                    </div>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
