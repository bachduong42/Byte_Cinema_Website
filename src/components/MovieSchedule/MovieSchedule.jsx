import React, { useState, useEffect } from "react";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
};

const getNext7Days = () => {
  const dates = [];
  const currentDate = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    dates.push(formatDate(date));
  }
  return dates;
};

const MovieSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(getNext7Days());
  }, []);
  const timeSlots = [
    { time: "5:10", price: "65K" },
    { time: "7:30", price: "65K" },
    { time: "9:00", price: "65K" },
    { time: "10:00", price: "65K" },
    { time: "12:00", price: "65K" },
    { time: "15:00", price: "65K" },
    { time: "16:00", price: "65K" },
    { time: "18:00", price: "65K" },
    { time: "19:00", price: "65K" },
    { time: "20:00", price: "90K" },
    { time: "22:00", price: "120K" },
    { time: "23:00", price: "65K" },
    { time: "23:10", price: "65K" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 overflow-x-auto mb-[40px]">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
              selectedDate === date
                ? "bg-[#092b4b] text-white"
                : "border-blue-300 text-gray-600"
            }`}

            style={{marginRight: "10px", padding: "30px"}}
          >
            {date}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {timeSlots.map((slot) => (
          <div key={slot.time} className="text-center border p-2 rounded-lg">
            <div className="text-gray-600">{slot.time}</div>
            <div className="text-green-500 font-bold">{slot.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSchedule;
