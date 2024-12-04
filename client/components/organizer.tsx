import React from 'react';
import { User } from '../../server/lib/definitions';

interface OrganizerProps {
  organizer?: User;
}

export const Organizer: React.FC<OrganizerProps> = ({ organizer }) => {
  return (
    <div className="border bg-white shadow-lg px-5 py-4 rounded-lg space-y-3">
      <h1 className="text-lg font-semibold">Organizer</h1>
      <div className="bg-gray-100 inline-flex flex-col items-center justify-center p-4 rounded-lg border">
        <div
          className="min-h-[50px] min-w-[50px] rounded-full border border-blue-700 bg-center"
          style={{
            backgroundImage: 'url("/main-events.png")',
            backgroundSize: "cover",
          }}
        />
        <p>
          {organizer?.first_name} {organizer?.last_name}
        </p>
        <p className="text-gray-600">Host</p>
      </div>
    </div>
  );
};