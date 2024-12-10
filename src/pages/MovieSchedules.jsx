import { faCalendar, faClock, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useParams } from "react-router-dom";
import ScheduleTable from "../components/ScheduleTable/ScheduleTable";
import { getDetailFilm } from "../services/getDetailFilm";
import { getAllAuditorium } from "../services/getAllAuditorium";
import { addSchedule } from "../services/addSchedule";
import { toast } from "react-toastify";
// import { FadeLoader } from "react-spinners";

function MovieSchedules() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(0);
  const [room, setRoom] = useState(null);
  const [filmData, setFilmData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [screeningData, setScreeningData] = useState(null);
  const [reLoad, setReload] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [type, setType] = useState(null);
  const { id } = useParams();
  // const [isLoading, setIsLoading] = useState(false);
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
        // setIsLoading(true);
        const bearer = localStorage.getItem("accessToken");
        const data = await getDetailFilm(id);
        const rooms = await getAllAuditorium(bearer);
        setFilmData(data);
        setRoomData(rooms);
        setScreeningData(data.screenings);
        // setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.error(e);
      }
    }
    getFilmData();
  }, [reLoad, type]);

  function convertDurationToMinutes(duration) {
    let hours = 0;
    let minutes = 0;

    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);

    if (hoursMatch) {
      hours = parseInt(hoursMatch[1], 10);
    }

    if (minutesMatch) {
      minutes = parseInt(minutesMatch[1], 10);
    }

    return hours * 60 + minutes;
  }

  useEffect(() => {
    if (selectedTime && filmData?.duration) {
      const durationInMinutes = convertDurationToMinutes(filmData.duration);
      const totalDuration = durationInMinutes + 30;
      const endDate = new Date(selectedTime.getTime() + totalDuration * 60000);
      setEndTime(endDate);
    }
  }, [selectedTime, filmData?.duration]);

  const handleCancel = (e) => {
    if (e) e.preventDefault();
    setSelectedDate(null);
    setSelectedTime(null);
    setEndTime(null);
    setPrice(0);
    setRoom("");
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    // Kết hợp ngày và giờ từ các giá trị đã chọn
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const combinedDateTime = new Date(
      Date.UTC(year, month, day, hours, minutes)
    );

    // Ngày phát hành phim
    const releaseDate = new Date(filmData.releaseDay);

    // Chuẩn hóa cả hai ngày về 00:00:00 để so sánh
    const normalizedCombinedDate = new Date(
      combinedDateTime.getFullYear(),
      combinedDateTime.getMonth(),
      combinedDateTime.getDate()
    );

    const normalizedReleaseDate = new Date(
      releaseDate.getFullYear(),
      releaseDate.getMonth(),
      releaseDate.getDate()
    );

    try {
      // So sánh chỉ ngày
      if (normalizedCombinedDate >= normalizedReleaseDate) {
        const data = await addSchedule(
          combinedDateTime.toISOString().replace(".000", ""),
          price,
          id,
          room
        );

        if (data) {
          // Thông báo thành công
          toast.success("Thêm lịch chiếu thành công", {
            autoClose: 800,
            position: "top-right",
          });

          // Reset form và cập nhật danh sách lịch chiếu
          handleCancel();
          setReload((prev) => !prev);
        } else {
          // Thông báo trùng lịch chiếu
          toast.error(
            "Đã có phim chiếu trong thời gian này. Vui lòng chọn lịch chiếu khác!",
            {
              autoClose: 1500,
              position: "top-right",
            }
          );
        }
      } else {
        // Format lại ngày phát hành để hiển thị
        const formattedDate = `${releaseDate
          .getDate()
          .toString()
          .padStart(2, "0")}-${(releaseDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${releaseDate.getFullYear()}`;

        setErrors({
          ...errors,
          date: `Lịch chiếu phải bắt đầu từ ngày ${formattedDate}`,
        });
      }
    } catch (message) {
      console.error("Lỗi khi thêm lịch chiếu:", message);
    }
  };

  const handleChange = (type) => {
    setType(type);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center w-full h-[700px]">
  //       <FadeLoader loading={isLoading} />
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-[850px] h-auto flex-col md:px-[130px] w-full mt-[150px] pb-5">
      <h1 className="text-[#008E28] text-[32px] font-bold">LỊCH CHIẾU</h1>
      <div className="w-full h-[0.8px] bg-[#092B4B] mt-5"></div>
      <div className="grid grid-cols-1 lg:grid-cols-[0.3fr,0.7fr] gap-4 mt-[35px]">
        <div className="flex justify-center">
          <img
            src={filmData?.imagePaths?.[0]}
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
              <div className="flex flex-col items-start">
                <div className="mb-3 text-[17px]">
                  Ngày chiếu<span className="text-[red] ml-1">*</span>
                </div>
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
              <div className="flex gap-x-3">
                <div className="flex flex-col items-start">
                  <div className="mb-3 text-[17px]">
                    Giờ chiếu<span className="text-[red] ml-1">*</span>
                  </div>
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
                <div className="flex flex-col items-start">
                  <span className="mb-3 text-[17px]">Giờ kết thúc</span>
                  <div className="relative w-full flex border border-gray-300 rounded-[8px] h-[46px]">
                    <DatePicker
                      readOnly
                      selected={endTime}
                      dateFormat="HH:mm"
                      placeholderText="HH:mm"
                      className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2 bg-gray-100"
                    />
                    <FontAwesomeIcon
                      icon={faClock}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="mb-3 text-[17px]">
                  Phòng chiếu<span className="text-[red] ml-1">*</span>
                </div>
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
              <div className="flex flex-col items-start">
                <div className="mb-3 text-[17px]">
                  Giá vé<span className="text-[red] ml-1">*</span>
                </div>
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
                    onFocus={(e) =>
                      e.target.addEventListener(
                        "wheel",
                        (e) => e.preventDefault(),
                        { passive: false }
                      )
                    }
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
          Danh sách suất chiếu
        </h3>
        {screeningData && roomData && (
          <ScheduleTable
            data={screeningData}
            roomData={roomData}
            handleReload={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default MovieSchedules;
