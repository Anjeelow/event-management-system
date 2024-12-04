import React from 'react';
import { User, Event } from '../../server/lib/definitions';
import { IoPeople } from "react-icons/io5";

interface AttendeesProps {
  event: Event;
  attendees: (User | undefined)[];
}

export const Attendees: React.FC<AttendeesProps> = ({ event, attendees }) => {
  return (
    <div className="h-auto border bg-white shadow-lg p-5 rounded-lg">
      <div>
        <div className="flex flex-row items-center gap-2">
          <IoPeople />
          <h1 className="text-lg font-semibold">Attendees</h1>
          <p className="text-gray-600">
            {event.attendee_count}/{event.max_attendees}
          </p>
        </div>
        {attendees.length > 0 ? (
          attendees.map((attendee, index) => (
            <div
              key={index}
              className="bg-gray-100 flex flex-row items-center p-4 rounded-lg border gap-2 my-2"
            >
              <div
                className="min-h-[50px] min-w-[50px] rounded-full border border-blue-700 bg-center"
                style={{
                  backgroundImage: 'url("/main-events.png")',
                  backgroundSize: "cover",
                }}
              />
              <div>
                <p>
                  {attendee?.first_name} {attendee?.last_name}
                </p>
                <p className="text-gray-600">
                  Registered{" "}
                  {attendee?.created_at &&
                  !isNaN(new Date(attendee?.created_at).getTime())
                    ? new Date(attendee.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )
                    : "Invalid date"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No Attendees</p>
        )}
      </div>
    </div>
  );
};