'use client';

import { AuthContext } from "@/app/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CalendarInput from "./date-picker";
import { Event } from "../../server/lib/definitions";
import { RxCrossCircled, RxCross1 } from "react-icons/rx";
import { RiErrorWarningLine } from "react-icons/ri";

export default function LeaveEventModal({ 
    setLeaveModalOpen,
    currentEvent,
    setFetchTime
}: { 
    setLeaveModalOpen: (open: boolean) => void,
    currentEvent: any,
    setFetchTime: (fetchTime: boolean) => void
}) {

    const { userId } = useContext(AuthContext)

    const handleLeave = async (e: any) => {
        e.preventDefault();

        try {
            const data = await axios.post('http://localhost:8080/api/rsvp/leave', { currentEvent, userId })
            console.log('Successfully left this event')
            setFetchTime(true)
            setLeaveModalOpen(false)
        } catch (err) {
            console.log('Error in leaving this event')
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5 z-50">
            <div className="bg-white p-6 pb-16 shadow-lg w-96 flex flex-col gap-5">
                <div className="flex justify-end cursor-pointer">
                    <RxCross1 onClick={() => setLeaveModalOpen(false)} />
                </div>
                <div className="flex justify-center">
                    <RiErrorWarningLine
                        size={100}
                        color="red"
                        style={{ opacity: 0.6 }}
                        className=""
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <h4 className="w-full mb-4 p-2 text-2xl text-center rounded">Are you sure?</h4>
                        <h4 className="text-center mb-8 text-gray-500">Are you sure you want to leave this event?</h4>
                    </div>
                    
                    <button
                        type="submit"
                        className="bg-red-400 text-white px-4 py-2 rounded-lg w-60 self-center"
                        onClick={(e) => handleLeave(e)}
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
}
