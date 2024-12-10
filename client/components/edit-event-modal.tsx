'use client';

import { AuthContext } from "@/app/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CalendarInput from "./date-picker";
import { Event } from "../../server/lib/definitions";

export default function EditModal({ 
    setEditModalOpen,
    currentEvent
}: { 
    setEditModalOpen: (open: boolean) => void,
    currentEvent: any
}) {

    const { setIsAuthenticated, setUserId } = useContext(AuthContext)
    const [title, setTitle] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [start, setStart] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()

        
    }

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
                            value={currentEvent.title}
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Description</h4>
                        <textarea
                            name="description"
                            value={currentEvent.description}
                            placeholder="Description"
                            className="w-full mb-3 p-2 border rounded"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">Start</h4>
                        <CalendarInput 
                            date={currentEvent.start_time}
                            setDate={setStart}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold">End</h4>
                        <CalendarInput 
                            date={currentEvent.end_time} 
                            setDate={setEnd} 
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
