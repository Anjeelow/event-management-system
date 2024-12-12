'use client'

import Link from "next/link"
import { useContext, useState } from "react"
import { AuthContext } from "../authContext"
import axios from "axios"
import LeaveEventModal from "@/components/leave-event-modal"
import EditModal from "@/components/edit-event-modal"

export default function BottomNavbar({ 
    organizer,
    isAttending,
    currentEvent,
    setFetchTime
} : { 
    organizer: any,
    isAttending: boolean,
    currentEvent: any,
    setFetchTime: (fetchTime: boolean) => void
}) {

    const { isAuthenticated, userId } = useContext(AuthContext)
    const [leaveModalOpen, setLeaveModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)

    const handleRsvp = async (e: any) => {
        e.preventDefault();
        
        // make sure to handle if the user is already rsvp'd
        
        try {
            const currentDay = new Date().toISOString()
            const data = await axios.post('http://localhost:8080/api/rsvp/attend', { currentEvent, userId, currentDay })
            setFetchTime(true)
            console.log('Successfully joined this event')
        } catch (err) {
            console.log('Error in attending this event', err)
        }
    }

    const handleLeave = async (e: any) => {
        e.preventDefault();
        setLeaveModalOpen(true)
    }

    const handleEdit = async (e: any) => {
        e.preventDefault()
        setEditModalOpen(true)
    }

    return (
        <div className="border bg-white flex justify-center fixed bottom-0 w-full z-40">
            <div
                className="flex flex-col px-5 gap-5 w-full justify-center"
                style={{ maxWidth: '76rem', height: '60px' }}
            >
                <div className="grid gap-5 md:grid-cols-[3fr_2fr] xl:grid-cols-[4fr_2fr] h-full">
                    <div className="hidden md:block"></div>
                    <div className="flex items-center h-full">
                        { isAuthenticated ? (
                            <div className="flex gap-5 text-black items-center w-full">
                                <button
                                    type="button"
                                    className="w-full border border-blue-700 text-blue-700 bg-white hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Share
                                </button>
                                { userId === organizer?.user_id ? (
                                    <button
                                        type="button"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    isAttending ? (
                                        <button
                                            type="button"
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600"
                                            onClick={(e) => handleLeave(e)}
                                        >
                                            Leave
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600"
                                            onClick={(e) => handleRsvp(e)}
                                        >
                                            Attend
                                        </button>
                                    )
                                )}
                                </div>
                        ) : (
                            <div className="flex gap-5 text-black w-full items-center">
                                <button
                                    type="button"
                                    className="w-full border border-blue-700 text-blue-700 bg-white hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Share
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {leaveModalOpen && (
                <LeaveEventModal 
                    setLeaveModalOpen={setLeaveModalOpen}
                    currentEvent={currentEvent}
                    setFetchTime={setFetchTime}
                />
            )}

            {editModalOpen && (
                <EditModal
                    setEditModalOpen={setEditModalOpen}
                    currentEvent={currentEvent}
                    setFetchTime={setFetchTime}
                />
            )}
        </div>
    )
}