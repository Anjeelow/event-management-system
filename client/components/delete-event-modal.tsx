'use client';

import { AuthContext } from "@/app/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CalendarInput from "./date-picker";
import { Event } from "../../server/lib/definitions";
import { RxCrossCircled, RxCross1 } from "react-icons/rx";

export default function DeleteModal({ 
    setDeleteModalOpen,
    currentEvent,
    setFetchTime
}: { 
    setDeleteModalOpen: (open: boolean) => void,
    currentEvent: any,
    setFetchTime: (fetchTime: boolean) => void
}) {

    const eventId = currentEvent.event_id

    const handleDelete = async (e: any) => {
        e.preventDefault()

        try {
            await Promise.all([
                axios.post('http://localhost:8080/api/events/delete', { eventId }),
                axios.post('http://localhost:8080/api/events/notify', {
                    eventId,
                    message: 'The event has been deleted.'
                })
            ])
            setDeleteModalOpen(false)
            setFetchTime(true)
            console.log('success')
        } catch (error: any) {
            console.log('An unexpected error occured. Please try again')
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 pb-16 shadow-lg w-96 flex flex-col gap-5">
                <div className="flex justify-end cursor-pointer">
                    <RxCross1 onClick={() => setDeleteModalOpen(false)} />
                </div>
                <div className="flex justify-center">
                    <RxCrossCircled
                        size={100}
                        color="red"
                        style={{ opacity: 0.6 }}
                        className=""
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <h4 className="w-full mb-4 p-2 text-2xl text-center rounded">Are you sure?</h4>
                        <h4 className="text-center mb-8 text-gray-500">Are you sure you want to delete this event? This process cannot be undone.</h4>
                    </div>
                    
                    <button
                        type="submit"
                        className="bg-red-400 text-white px-4 py-2 rounded-lg w-60 self-center"
                        onClick={(e) => handleDelete(e)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
