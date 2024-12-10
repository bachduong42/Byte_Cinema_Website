import { useEffect } from "react";
import BookingMovieSchedule from "../../components/MovieSchedule/BookingMovieSchedule";

function SelectSeat({
  rows,
  seatsPerRow,
  listSeats,
  setListSeats,
  listSeatIds,
  setlistSeatIds,
  schedule,
  onClick,
  totalSeats,
  auditoriumName,
  orderedSeats,
  auditoriumSeats,
}) {
  //   const handleSeatClick = (seat) => {
  //     setListSeats((prevSeats) => {
  //       if (prevSeats.includes(seat)) {
  //         return prevSeats.filter((s) => s !== seat);
  //       } else {
  //         return [...prevSeats, seat];
  //       }
  //     });
  //   };

  const orderedIdSeat = orderedSeats.map((orderedSeat) => {
    return orderedSeat.id;
  });

  const handleSeatClick = (seatLabel, id) => {
    const seatId = id;
    const seatExists = listSeatIds.includes(seatId);
    setlistSeatIds((prevIds) => {
      if (seatExists) {
        return prevIds.filter((id) => id !== seatId).map((id) => id);
      } else {
        return [...prevIds, seatId];
      }
    });
    setListSeats((prevSeats) => {
      if (seatExists) {
        return prevSeats.filter((label) => label !== seatLabel);
      } else {
        return [...prevSeats, seatLabel];
      }
    });
    console.log(seatId);

    console.log(orderedSeats);
  };

  const clear = () => {
    setListSeats([]);
    setlistSeatIds([]);
  };
  // Tổ chức mảng 2 chiều
  const organizedSeats = auditoriumSeats.reduce((result, seat) => {
    if (!result[seat.seatRow]) result[seat.seatRow] = [];
    result[seat.seatRow].push(seat);
    return result;
  }, {});

  // Chuyển đổi thành mảng 2 chiều
  const seatArray2D = Object.values(organizedSeats);

  function groupScreeningsByDate(screenings) {
    if (screenings) {
      const grouped = screenings.reduce((acc, screening) => {
        const date = screening.startTime.split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(screening);
        return acc;
      }, {});
      return Object.entries(grouped).map(([date, screenings]) => {
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}/${month}`;

        return {
          date: formattedDate,
          screenings,
        };
      });
    }
  }

  // const seatsByRow = rows.reduce((acc, seat) => {
  //     if (!acc[seat.seatRow]) {
  //       acc[seat.seatRow] = [];
  //     }
  //     acc[seat.seatRow].push(seat);
  //     return acc;
  //   }, {});

  return (
    <>
      <div className="flex w-full bg-[#d9e9f0] rounded-md h-[180px] mb-5 items-center px-5 justify-between">
        <div className="font-bold text-[#092b4b] text-[20px]">
          Chọn suất chiếu
        </div>
        {/* <div className="flex gap-3">
                    <div className="bg-[#092b4b] cursor-pointer  text-white rounded-md px-5 py-2">11:30</div>
                    <div className="bg-white text-[#092b4b] hover:bg-[#092b4b] hover:text-white cursor-pointer  rounded-md px-5 py-2">12:30</div>
                    <div className="bg-white text-[#092b4b] hover:bg-[#092b4b] hover:text-white cursor-pointer  rounded-md px-5 py-2">16:30</div>
                    <div className="bg-white text-[#092b4b] hover:bg-[#092b4b] hover:text-white  cursor-pointer rounded-md px-5 py-2">14:30</div>
                </div> */}
        <BookingMovieSchedule
          data={groupScreeningsByDate(schedule)}
          onClick={onClick}
          onChange={clear}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-xl mb-[15px] font-semibold text-[#092b4b]">
          Chọn ghế
        </span>
        <div className="w-[110px] h-[30px] bg-[#0DB1F6] text-white flex items-center justify-center font-semibold rounded-md">
          {auditoriumName}
        </div>
      </div>
      <div>Màn hình</div>
      <div className="w-[80%] border border-t-[#0DB1F6] border-t-2 mx-auto my-2"></div>
      <div className="space-y-2 pt-5">
        {seatArray2D.map((row, rowIndex) => {
          const remainingSeats =
            (auditoriumSeats.length - rowIndex) ^ seatsPerRow;
          const seatsInRow = Math.min(seatsPerRow, remainingSeats); // Số ghế cho hàng hiện tại
          return (
            <div
              key={`row-${rowIndex}`}
              className="flex items-center gap-16 justify-center"
            >
              <div className="w-5">{row[0]?.seatRow}</div>
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${seatsInRow}, minmax(0, 1fr))`,
                }}
              >
                {row.map((seat) => {
                  const isSelected = listSeatIds.includes(seat.id);
                  const seatLabel = `${seat.seatRow}${seat.seatNumber}`;
                  const isOrdered = orderedIdSeat.includes(seat.id);
                  return (
                    <button
                      onClick={() => handleSeatClick(seatLabel, seat.id)}
                      key={seatLabel}
                      disabled={isOrdered}
                      className={`w-[25px] h-[25px] border border-[#e1e1e1] rounded-md transition 
                        ${isSelected ? "bg-[#F75900] text-white font-semibold" : ""}
                        ${isOrdered ? "bg-[#d0d0d0] text-white" : "hover:bg-[#F75900]"}`
                      }
                    >
                      {seat.seatNumber}
                    </button>
                  );
                })}
              </div>
              <div className="w-5">{row[0]?.seatRow}</div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-16">
        <div className="flex gap-2">
          <div className="w-[25px] h-[25px] bg-[#F75900] rounded-md"></div>
          <span>Ghế đang chọn</span>
        </div>
        <div className="flex gap-2">
          <div className="w-[25px] h-[25px] bg-[#d0d0d0] rounded-md"></div>
          <span>Ghế đã bán</span>
        </div>
      </div>
    </>
  );
}

export default SelectSeat;
