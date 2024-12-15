import React, { useEffect, useState } from "react";
import TimePicker from "react-datepicker";
import { subDays } from "react-datepicker/dist/date_utils";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";

export default function CalendarInput({
  date,
  setDate,
}: {
  date: Date | null;
  setDate: (date: Date | null) => void;
}) {
  const [defaultDate, setDefaultDate] = useState<Date | null>(null);

  useEffect(() => {
    if (date) {
      setDefaultDate(new Date(date));
    } else {
      const msIn30Min = 30 * 60 * 1000;
      const roundedTime = new Date(
        Math.ceil(new Date().getTime() / msIn30Min) * msIn30Min
      );
      setDefaultDate(roundedTime);
    }
  }, [date]);

  const handleClick = (newDate: any) => {
    setDate(newDate);
    setDefaultDate(newDate);
  };

  return (
    <div className="w-full">
        <TimePicker
          showTimeSelect
          dateFormat="Pp"
          wrapperClassName="w-full"
          className="p-2 w-full border rounded-md"
          minDate={new Date()}
          onChange={(newDate) => {
            handleClick(newDate);
          }}
          selected={defaultDate}
        />
        {/* <CiCalendar className="opacity-40 ml-2 cursor-pointer" size={30} /> */}
    </div>
  );
}
