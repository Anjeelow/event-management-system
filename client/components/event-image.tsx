import React from 'react';
import { Event } from '../../server/lib/definitions';

interface EventImageProps {
  event: Event;
}

export const EventImage: React.FC<EventImageProps> = ({ event }) => {
  return (
    <div
      className="relative rounded-xl xl:m-0 w-full h-[300px] flex items-end p-5 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.7)), url("/main-events.png")`,
      }}
    >
      <div className="text-white">
        <h1 className="font-bold text-4xl leading-tight m-0">
          {event.title}
        </h1>
        <p className="font-medium text-2xl m-0">
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};