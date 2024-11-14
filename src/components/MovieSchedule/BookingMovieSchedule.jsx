import React, {useState} from "react";

const BookingMovieSchedule = ({ data, onClick }) => {
  const [selectedDate, setSelectedDate] = useState(data[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  function getTimeFromDateTime(dateTime) {
    const timePart = dateTime.split("T")[1]; 
    const [hour, minute] = timePart.split(":");
    return `${hour}:${minute}`; 
  }
 
  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 overflow-x-auto mb-[40px]">
        {data.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(item)}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
              selectedDate.date === item.date
                ? "bg-[#092b4b] text-white"
                : "border-blue-300 text-gray-600"
            }`}
            style={{ marginRight: "10px", padding: "30px" }}
          >
            {item.date}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {selectedDate?.screenings.map((slot, index) => (
          <div
            key={index}
            className={`hover:bg-[#092b4b] hover:text-white text-[#092b4b]  cursor-pointer rounded-md px-5 py-2 ${
              selectedSlot === slot.id ? "bg-[#092b4b] text-white" : "bg-white"
            }`}
            onClick={() => {
              setSelectedSlot(slot.id);
              onClick(slot.id, slot.ticketPrice, slot.startTime);
            }}
          >
              {getTimeFromDateTime(slot.startTime)}
            {/* <div className="text-green-500 font-bold">{`${slot.ticketPrice}.000đ`}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingMovieSchedule;