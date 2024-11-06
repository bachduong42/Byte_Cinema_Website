function SelectSeat({ rows, seatsPerRow, listSeats, setListSeats, listSeatIds, setlistSeatIds }) {
    const handleSeatClick = (row, seatNumber) => {
        const seatLabel = `${row}${seatNumber}`;
        const seatId = ((rows.indexOf(row)) * seatsPerRow) + seatNumber;
        const seatExists = listSeatIds.includes(seatId);
        setlistSeatIds((prevIds) => {
            if (seatExists) {
                return prevIds.filter((id) => id !== seatId);
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

    };

    return (
        <>
            <div className="flex w-full bg-[#d9e9f0] rounded-md h-[80px] mb-5 items-center px-5 justify-between">
                <div className="font-bold text-[#092b4b]">Đổi suất chiếu</div>
                <div className="flex gap-3">
                    <div className="bg-[#092b4b] cursor-pointer  text-white rounded-md px-5 py-2">11:30</div>
                    <div className="bg-white text-[#092b4b] hover:bg-[#092b4b] hover:text-white cursor-pointer  rounded-md px-5 py-2">12:30</div>
                    <div className="bg-white text-[#092b4b] hover:bg-[#092b4b] hover:text-white cursor-pointer  rounded-md px-5 py-2">16:30</div>
                    <div className="bg-white text-[#092b4b] hover:bg-[#092b4b] hover:text-white  cursor-pointer rounded-md px-5 py-2">14:30</div>
                </div>
            </div>
            <div className="flex justify-between">
                <span className="text-xl mb-[15px] font-semibold text-[#092b4b]">Chọn ghế</span>
                <div className="w-[110px] h-[30px] bg-[#0DB1F6] text-white flex items-center justify-center font-semibold rounded-md">Phòng B05</div>
            </div>
            <div>Màn hình</div>
            <div className="w-[80%] border border-t-[#0DB1F6] border-t-2 mx-auto my-2"></div>
            <div className="space-y-2 pt-5">
                {rows.map((row) => (
                    <div className="flex items-center gap-16 justify-center" key={row}>
                        <div className="w-5">{row}</div>
                        <div className="grid grid-cols-10 gap-3">
                            {Array.from({ length: seatsPerRow }, (_, index) => {
                                const seatNumber = index + 1;
                                const seatLabel = `${row}${seatNumber}`;
                                const seatId = (rows.indexOf(row) * seatsPerRow) + seatNumber;
                                const isSelected = listSeatIds.includes(seatId);
                                return (
                                    <button
                                        onClick={() => handleSeatClick(row, seatNumber)}
                                        key={seatLabel}
                                        className={`w-[25px] h-[25px] border border-[#e1e1e1] rounded-md transition ${isSelected ? "bg-[#F75900] text-white font-semibold" : "hover:bg-[#F75900]"} flex justify-center items-center`}>  {seatNumber}</button>
                                )
                            })}
                        </div>
                        <div className="w-5">{row}</div>
                    </div>
                ))}
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