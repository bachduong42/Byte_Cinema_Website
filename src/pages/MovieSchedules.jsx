import { faCalendar, faClock, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import ScheduleTable from "../components/ScheduleTable/ScheduleTable";
import { getDetailFilm } from "../services/getDetailFilm";
import { getAllAuditorium } from "../services/getAllAuditorium";
import { addSchedule } from "../services/addSchedule";
import { toast } from "react-toastify";

function MovieSchedules() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(0);
  const [room, setRoom] = useState(null);
  const [filmData, setFilmData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [screeningData, setScreeningData] = useState(null);
  const [reLoad, setReload] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState({
    date: "",
    time: "",
    room: "",
    price: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {
      date: "",
      time: "",
      room: "",
      price: "",
    };

    if (!selectedDate) {
      formIsValid = false;
      errors.date = "Vui lòng chọn ngày chiếu";
    }

    if (!selectedTime) {
      formIsValid = false;
      errors.time = "Vui lòng chọn giờ chiếu";
    }

    if (!room) {
      formIsValid = false;
      errors.room = "Vui lòng chọn phòng chiếu";
    }

    if (!price || price <= 0) {
      formIsValid = false;
      errors.price = "Giá vé phải lớn hơn 0";
    }

    setErrors(errors);
    return formIsValid;
  };

  useEffect(() => {
    async function getFilmData() {
      try {
        const bearer = localStorage.getItem("accessToken");
        const data = await getDetailFilm(id);
        const rooms = await getAllAuditorium(bearer);
        setFilmData(data);
        setRoomData(rooms);
        setScreeningData(data.screenings);
      } catch (e) {
        console.error(e);
      }
    }
    getFilmData();
  }, [reLoad]);

  const handleCancel = (e) => {
    if (e) e.preventDefault();
    setSelectedDate(null);
    setSelectedTime(null);
    setPrice(0);
    setRoom("");
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const datePart = selectedDate.toISOString().split("T")[0];
    const timePart = selectedTime.toTimeString().split(" ")[0];
    const combinedDateTime = `${datePart}T${timePart}Z`;

    const combinedDateTimeDate = new Date(combinedDateTime);
    const releaseDate = new Date(filmData.releaseDay);

    try {
      if (combinedDateTimeDate >= releaseDate) {
        const data = await addSchedule(combinedDateTime, price, id, room);
        if (data) {
          toast.success("Thêm lịch chiếu thành công", {
            autoClose: 800,
            position: "top-right",
          });
          handleCancel();
          setReload((prev) => !prev);
        } else {
          toast.error(
            "Đã có phim chiếu trong thời gian này. Vui lòng chọn lịch chiếu khác!",
            {
              autoClose: 800,
              position: "top-right",
            }
          );
        }
      } else {
        const dateStr = "2024-09-30";
        const [year, month, day] = dateStr.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        setErrors({
          ...errors,
          date: `Lịch chiếu phải bắt đầu từ ngày ${formattedDate}`,
        });
      }
    } catch (message) { }
  };

  return (
    <div className="flex min-h-[850px] h-auto flex-col md:px-[130px] w-full mt-[150px] pb-5">
      <h1 className="text-[#008E28] text-[32px] font-bold">LỊCH CHIẾU</h1>
      <div className="w-full h-[0.8px] bg-[#092B4B] mt-5"></div>
      <div className="grid grid-cols-1 lg:grid-cols-[0.3fr,0.7fr] gap-4 mt-[35px]">
        <div className="flex justify-center">
          <img
            src={filmData?.imagePaths[0]}
            alt="image"
            className="w-[300px] h-[400px] object-cover"
          ></img>
        </div>
        <div className="flex flex-col">
          <h2 className="text-[30px] text-[#092B4B] font-bold">
            {filmData?.name}
          </h2>
          <Link
            className="text-[#008E28] text-[20px] italic mt-1"
            to={`/movie/${filmData?.id}`}
          >
            Xem chi tiết
          </Link>
          <form className="mt-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Ngày chiếu</span>
                <div className="relative w-full flex border border-gray-300 rounded-[8px] h-[46px]">
                  <DatePicker
                    minDate={new Date()}
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setErrors({ ...errors, date: "" });
                    }}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                    className="w-full text-[18px] border-none outline-none p-2 rounded-[8px]"
                  />
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                {errors.date && (
                  <span className="text-red-500">{errors.date}</span>
                )}
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Giờ chiếu</span>
                <div className="relative w-full flex border border-gray-300 rounded-[8px] h-[46px]">
                  <DatePicker
                    selected={selectedTime}
                    onChange={(date) => {
                      setSelectedTime(date);
                      setErrors({ ...errors, time: "" });
                    }}
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
                {errors.time && (
                  <span className="text-red-500">{errors.time}</span>
                )}
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Phòng chiếu</span>
                <select
                  required
                  value={room || ""}
                  onChange={(e) => {
                    setRoom(e.target.value);
                    setErrors({ ...errors, room: "" });
                  }}
                  className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                >
                  <option value="">Chọn phòng chiếu</option>
                  {roomData?.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {room.capacity} ghế
                    </option>
                  ))}
                </select>
                {errors.room && (
                  <span className="text-red-500">{errors.room}</span>
                )}
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Giá vé</span>
                <div className="relative w-full flex border border-gray-300 rounded-[8px] h-[46px]">
                  <input
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setErrors({ ...errors, price: "" });
                    }}
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
                {errors.price && (
                  <span className="text-red-500">{errors.price}</span>
                )}
              </div>
            </div>
            <div className="flex mt-[60px] justify-center gap-[50px]">
              <button
                className="w-[150px] h-[42px] border-[1px] border-solid border-[#008E28] rounded-[8px] text-[#008E28] hover:opacity-90"
                onClick={handleCancel}
              >
                Huỷ
              </button>
              <button
                className="w-[150px] h-[42px] border-[1px] border-solid bg-[#008E28] rounded-[8px] text-[#fff] hover:opacity-90"
                onClick={handleAddSchedule}
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className="text-[#092B4B] font-medium text-[26px] float-left mb-4">
          Danh sách xuất chiếu
        </h3>
        {screeningData && (
          <ScheduleTable data={screeningData} roomData={roomData} />
        )}
      </div>
    </div>
  );
}

export default MovieSchedules;