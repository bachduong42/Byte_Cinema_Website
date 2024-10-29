import { faCalendar, faClock, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import ScheduleTable from "../components/ScheduleTable/ScheduleTable";

function MovieSchedules() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(0);
  const [room, setRoom] = useState(null);

  return (
    <div className="flex min-h-[850px] h-auto flex-col md:px-[130px] w-full mt-[150px] pb-5">
      <h1 className="text-[#008E28] text-[28px] font-bold">LỊCH CHIẾU</h1>
      <div className="w-full h-[0.8px] bg-[#092B4B] mt-5"></div>
      <div className="grid grid-cols-1 lg:grid-cols-[0.3fr,0.7fr] gap-4 mt-[35px]">
        <div className="flex justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEB3Cup6M6R-I6hkU5MummcWIvOw6NlrCjA&s"
            alt="image"
            className="w-[300px] h-[400px] object-cover"
          ></img>
        </div>
        <div className="flex flex-col">
          <h2 className="text-[22px] text-[#092B4B] font-bold">KẺ ẨN DANH</h2>
          <Link
            className="text-[#008E28] text-[17px] italic mt-1"
            to="/movie/1"
          >
            Xem chi tiết
          </Link>
          <form className="mt-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Ngày chiếu</span>
                <div className="relative w-full flex border border-gray-300 rounded-[8px] h-[46px]">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    datedivat="dd-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                    className="w-full text-[18px] border-none outline-none p-2 rounded-[8px]"
                  />
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Giờ chiếu</span>
                <div className="relative w-full flex border border-gray-300 rounded-[8px] h-[46px]">
                  <DatePicker
                    selected={selectedTime}
                    onChange={(date) => setSelectedTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={10}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    placeholderText="HH:mm"
                    className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                  />
                  <FontAwesomeIcon
                    icon={faClock}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Phòng chiếu</span>
                <select
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                >
                  <option>Chọn phòng chiếu</option>
                  <option value="P1">Phòng 1</option>
                  <option value="P2">Phòng 2</option>
                  <option value="P3">Phòng 3</option>
                </select>
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Giá vé</span>
                <div className="relative w-full flex border border-gray-300 rounded-[8px] h-[46px]">
                  <input
                    value={price}
                    type="number"
                    className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2 no-spinner"
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    VNĐ
                  </span>
                </div>
              </div>
            </div>
            <div className="flex mt-[60px] justify-center gap-[50px]">
              <button className="w-[150px] h-[42px] border-[1px] border-solid border-[#008E28] rounded-[8px] text-[#008E28] hover:opacity-90">
                Huỷ
              </button>
              <button className="w-[150px] h-[42px] border-[1px] border-solid bg-[#008E28] rounded-[8px] text-[#fff] hover:opacity-90">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className="text-[#092B4B] font-medium text-[26px] float-left mb-4">Danh sách xuất chiếu</h3>
        <ScheduleTable/>
      </div>
    </div>
  );
}

export default MovieSchedules;
