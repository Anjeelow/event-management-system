import React from 'react';
import { Event } from '../../server/lib/definitions';
import { 
  IoLocationOutline, 
  IoCalendarClearOutline, 
  IoTimeOutline 
} from "react-icons/io5";

interface AboutEventProps {
  event: Event;
  startDateString?: string;
  endDateString?: string;
}

export const AboutEvent: React.FC<AboutEventProps> = ({ 
  event, 
  startDateString = '', 
  endDateString = '' 
}) => {
  return (
    <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
      <h1 className="text-lg font-semibold">About this event</h1>
      <div>
        <div className="flex flex-row items-center gap-2">
          <IoCalendarClearOutline className="text-blue-500" />
          <p>
            {startDateString}{startDateString && endDateString ? " — " : ""}{endDateString}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <IoLocationOutline className="text-blue-500" />
          <p>{event.address}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <IoTimeOutline className="text-blue-500" />
          <p>
            {Math.trunc(event.duration / 60)} hours,{" "}
            {event.duration % 60} minutes
          </p>
        </div>
      </div>
      <p className="text-gray-600">{event.description}</p>
    </div>
  );
};