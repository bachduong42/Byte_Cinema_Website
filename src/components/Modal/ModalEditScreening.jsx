import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { getAllAuditorium } from "../../services/getAllAuditorium";
import { getDetailFilm } from "../../services/getDetailFilm";
import { getScreeningRequest } from "../../services/getScreening";
function ModalEditScreening({ handleClose, idScreening }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [price, setPrice] = useState(0);
    const [room, setRoom] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [screeningData, setScreeningData] = useState(null);
    const [reLoad, setReload] = useState(false);
    console.log(idScreening.current);

    const [errors, setErrors] = useState({
        date: "",
        time: "",
        room: "",
        price: "",
    });

    // const validateForm = () => {
    //     let formIsValid = true;
    //     let errors = {
    //         date: "",
    //         time: "",
    //         room: "",
    //         price: "",
    //     };

    //     if (!selectedDate) {
    //         formIsValid = false;
    //         errors.date = "Vui lòng chọn ngày chiếu";
    //     }

    //     if (!selectedTime) {
    //         formIsValid = false;
    //         errors.time = "Vui lòng chọn giờ chiếu";
    //     }

    //     if (!room) {
    //         formIsValid = false;
    //         errors.room = "Vui lòng chọn phòng chiếu";
    //     }

    //     if (!price || price <= 0) {
    //         formIsValid = false;
    //         errors.price = "Giá vé phải lớn hơn 0";
    //     }

    //     setErrors(errors);
    //     return formIsValid;
    // };

    useEffect(() => {
        async function getFilmData() {
            try {
                const bearer = localStorage.getItem("accessToken");
                const rooms = await getAllAuditorium(bearer);
                const screenings = await getScreeningRequest(bearer, idScreening.current);
                setRoomData(rooms);
                setScreeningData(screenings.data);
                console.log(rooms);
                console.log(screenings.data)
                setPrice(screeningData.ticketPrice);
                setRoom(screeningData.auditoriumName)
            } catch (e) {
                console.error(e);
            }
        }
        getFilmData();
    }, [reLoad]);
    // const datePart = selectedDate.toISOString().split("T")[0];
    // const timePart = selectedTime.toTimeString().split(" ")[0];
    // const combinedDateTime = `${datePart}T${timePart}Z`;
    // const combinedDateTimeDate = new Date(combinedDateTime);
    // const releaseDate = new Date(filmData.releaseDay);
    const handleCancel = (e) => {
        if (e) e.preventDefault();
        setSelectedDate(null);
        setSelectedTime(null);
        setPrice(0);
        setRoom("");
        handleClose();
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
                        <div className="text-[23px] w-[400px] text-[#0F3E4A] font-bold">Cập nhật lịch chiếu</div>
                        <MdClose className="text-[20px] font-bold cursor-pointer" onClick={handleCancel} />
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
                        <div className="flex pt-[30px] justify-center gap-[50px]">
                            <button
                                className="w-[150px] h-[42px] border-[1px] border-solid border-[#008E28] rounded-[8px] text-[#008E28] hover:opacity-90"
                                onClick={handleCancel}
                            >
                                Huỷ
                            </button>
                            <button
                                className="w-[150px] h-[42px] border-[1px] border-solid bg-[#008E28] rounded-[8px] text-[#fff] hover:opacity-90"
                            // onClick={handleAddSchedule}
                            >
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>

    );
}

export default ModalEditScreening;