function BillTransaction({ listSeats, billSuccess, name, imgSrc, duration, nation, ticketPrice, startTime, totalPrice, auditorium, language }) {




  function convertDurationToMinutes(duration) {
    if (duration) {
      const hours = duration.match(/(\d+)H/);
      const minutes = duration.match(/(\d+)M/);

      const totalMinutes =
        (hours ? parseInt(hours[1]) * 60 : 0) +
        (minutes ? parseInt(minutes[1]) : 0);
      return totalMinutes;
    }
    return ''
  }

  function getTimeFromDateTime(dateTime) {
    const [timePart] = dateTime.split(" ");
    return timePart;
  }

  function getDateFromDateTime(dateTime) {
    const [, datePart] = dateTime.split(" ");
    const [day, month, year] = datePart.split("-");
    return `${day}/${month}/${year}`;
  }



  return (
    <>
      <div
        className={`flex flex-col bg-[#d9e9f0] ${billSuccess ? "w-full" : "lg:w-1/4 w-2/5"
          } min-h-[650px] rounded-md pt-2 gap-1 tippy-box`}
      >
        <span className="text-2xl mb-[15px] font-bold text-[#092b4b]">
          HÓA ĐƠN
        </span>
        <hr className="border-t-0 border-[#092b4b] border w-[80%] mx-auto" />
        <div className="w-full px-3 h-[200px] pt-2">
          <div className="w-full bg-white h-full px-4 py-4 flex gap-2">
            <img
              src={imgSrc}
              alt=""
              className="w-[150px] h-full rounded-sm object-cover"
            />
            <div className="flex flex-col px-1 gap-2 text-start">
              <h1 className="text-xl font-bold text-[#092b4b] ">{name}</h1>
              <div className="w-[40px] h-[20px] bg-[#9E0000] rounded-sm text-[14px] items-center justify-center flex text-white font-bold">
                18+
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-[14px] font-semibold">Thời lượng:</span>
                <span className="text-[14px]">{convertDurationToMinutes(duration)} phút</span>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-[14px] font-semibold">Quốc gia:</span>
                <span className="text-[14px]">{nation}</span>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-[14px] font-semibold">Ngôn ngữ:</span>
                <span className="text-[14px]">{language}</span>
              </div>
              {/* <div className="flex gap-3">
                  <span className="text-[16px] font-semibold ">Ngôn ngữ:</span>
                  <span className="text-[16px]">{language}</span>
                </div> */}
            </div>
          </div>
          <div className="bg-white w-full h-auto min-h-[280px] px-5 pt-5 mt-5 gap-2 flex flex-col">
            <div className="flex justify-between font-semibold">
              <span>Thời gian:</span>
              <span>{startTime ? getDateFromDateTime(startTime) : "Chưa chọn suất chiếu"}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Suất chiếu:</span>
              <span>{startTime ? getTimeFromDateTime(startTime) : "Chưa chọn suất chiếu"}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Giá tiền 1 vé:</span>
              <span className="text-[#008E28]">{ticketPrice}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Phòng chiếu:</span>
              <span>{auditorium}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Số ghế:</span>
              <span>{listSeats.length}</span>
            </div>
            <div className="text-[#F75900] text-start">
              Ghế {listSeats.join(", ")}
            </div>
            <div className="border-dashed  border-[#576f85] border"></div>
            <div className="flex justify-between font-semibold">
              <span>Tổng tiền:</span>
              <span className="text-[#008E28]">{totalPrice}</span>
            </div>
          </div>
          {billSuccess && (
            <div className="mt-2 text-[#092B4B] italic">
              BYTES Cinema chúc bạn sẽ có trải nghiệm tuyệt vời tại rạp. Cảm ơn vì
              đã lựa chọn chúng tôi !
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BillTransaction;