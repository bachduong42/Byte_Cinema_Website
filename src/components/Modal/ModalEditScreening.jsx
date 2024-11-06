import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { getAllAuditorium } from "../../services/getAllAuditorium";
import { getDetailFilm } from "../../services/getDetailFilm";
import { getScreeningRequest } from "../../services/getScreening";
import { getScreeningById } from "../../services/getScreeningById";
import { updateScreening } from "../../services/updateScreening";
import { toast } from "react-toastify";

function ModalEditScreening({ handleClose, idScreening, handleReload }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [screeningData, setScreeningData] = useState(null);
  const [releaseDay, setReleaseDay] = useState(null);
  const [movieId, setMovieId] = useState(null);

  const [errors, setErrors] = useState({
    date: "",
    // time: "",
    // room: "",
    price: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {
      date: "",
      //   time: "",
      //   room: "",
      price: "",
    };

    if (!selectedDate) {
      formIsValid = false;
      errors.date = "Vui lòng chọn ngày chiếu";
    }

    // if (!selectedTime) {
    //   formIsValid = false;
    //   errors.time = "Vui lòng chọn giờ chiếu";
    //   }

    // if (!selectedRoom) {
    //   formIsValid = false;
    //   errors.room = "Vui lòng chọn phòng chiếu";
    // }

    if (!price || price <= 0) {
      formIsValid = false;
      errors.price = "Giá vé phải lớn hơn 0";
    }

    setErrors(errors);
    return formIsValid;
  };

  useEffect(() => {
    async function fetchScreeingById() {
      const access_token = localStorage.getItem("accessToken");
      const data = await getScreeningById(access_token, idScreening);
      if (data) {
        setScreeningData(data);
        setPrice(data.ticketPrice);
        const dateObj = new Date(data.startTime);
        const selectedDateFor = new Date(
          dateObj.getUTCFullYear(),
          dateObj.getUTCMonth(),
          dateObj.getUTCDate()
        );
        setSelectedDate(selectedDateFor);
        const timeForDatePicker = new Date();
        timeForDatePicker.setHours(dateObj.getUTCHours());
        timeForDatePicker.setMinutes(dateObj.getUTCMinutes());
        timeForDatePicker.setSeconds(0); // Đặt giây là 0

        setSelectedTime(timeForDatePicker); // Thiết lập thời gian cho selectedTime

        setSelectedRoom(data.auditoriumId);
        setMovieId(data.movieId);
        const dataFilm = await getDetailFilm(data.movieId);
        setReleaseDay(dataFilm.releaseDay);
      }
      const rooms = await getAllAuditorium(localStorage.getItem("accessToken"));
      setRoomData(rooms);
    }

    fetchScreeingById();
  }, [idScreening]);

  const handleCancel = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const combinedDateTime = new Date(
      Date.UTC(year, month, day, hours, minutes)
    );
    const releaseDate = new Date(releaseDay);

    try {
      if (combinedDateTime.toISOString() >= releaseDate.toISOString()) {
        console.log("Vo update");
        const data = await updateScreening(
          idScreening,
          combinedDateTime,
          price,
          movieId,
          selectedRoom
        );
        console.log(data);
        if (data) {
          console.log("Vo co data");
          toast.success("Cập nhật lịch chiếu thành công", {
            autoClose: 1000,
            position: "top-center",
          });
          handleClose();
          handleReload(Date.now());
        } else {
          toast.error(
            "Đã có phim chiếu trong thời gian này. Vui lòng chọn lịch chiếu khác!",
            {
              autoClose: 1200,
              position: "top-center",
            }
          );
        }
      } else {
        const releaseDayFormat = new Date(releaseDate);
        const year = releaseDayFormat.getFullYear();
        const month = (releaseDayFormat.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const day = releaseDayFormat.getDate().toString().padStart(2, "0");
        const formattedDate = `${day}-${month}-${year}`;
        setErrors({
          ...errors,
          date: `Lịch chiếu phải bắt đầu từ ngày ${formattedDate}`,
        });
      }
    } catch (error) {
      if(error.response.data.message.includes('There is already screening'))
      {
        toast.error(
          "Đã có phim chiếu trong thời gian này. Vui lòng chọn lịch chiếu khác!",
          {
            autoClose: 1200,
            position: "top-center",
          }
        );
      }
      else {
        toast.error(
          "Đã có vé được đặt vào thời gian này, không thể cập nhật!",
          {
            autoClose: 1200,
            position: "top-center",
          }
        );
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
      <div
        className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
        onClick={handleCancel}
      >
        <div
          className="modal min-w-[550px] min-h-[370px] w-1/3 h-1/3 flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex pt-2 items-center h-[70px]">
            <div className="text-[23px] w-[400px] text-[#0F3E4A] font-bold">
              Cập nhật lịch chiếu
            </div>
            <MdClose
              className="text-[20px] font-bold cursor-pointer"
              onClick={handleCancel}
            />
          </div>
          <hr className="border-black border-[1px]" />
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
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Phòng chiếu</span>
                <select
                  required
                  value={selectedRoom || ""}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                >
                  {roomData?.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {room.capacity} ghế
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-start row-span-4">
                <span className="mb-3 text-[17px]">Giá vé</span>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                />
                {errors.price && (
                  <span className="text-red-500">{errors.price}</span>
                )}
              </div>
            </div>
            <div className="flex pt-[30px] justify-center gap-[50px]">
              <button
                className="w-[150px] h-[42px] border-[1px] border-solid border-[#008E28] rounded-[8px] text-[#008E28] hover:opacity-90"
                onClick={handleCancel}
              >
                Huỷ
              </button>
              <button
                className="w-[150px] h-[42px] border-[1px] border-solid bg-[#008E28] rounded-[8px] text-[#fff] hover:opacity-90"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalEditScreening;
