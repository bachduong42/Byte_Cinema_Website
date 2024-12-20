import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuditoriumTable from "../components/AuditoriumTable/AuditoriumTable";
import { useEffect, useState } from "react";
import { getAllAuditorium } from "../services/getAllAuditorium";
import ModalAuditorium from "../components/Modal/ModalAuditorium";
import { getListMovie } from "../services/getListMovie";

function AuditoriumManagement() {
  const [type, setType] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleReload = (type) => {
    setType(type);
  };

  useEffect(() => {
    async function fetchRoomData() {
      const listMovies = await getListMovie();
      const screeningsByAuditorium = listMovies.data.reduce((acc, movie) => {
        movie.screenings.forEach((screening) => {
          const auditoriumName = screening.auditoriumName;
          if (!acc[auditoriumName]) {
            acc[auditoriumName] = 0;
          }
          acc[auditoriumName] += 1;
        });
        return acc;
      }, {});

      const data = await getAllAuditorium(localStorage.getItem("accessToken"));
      if (data) {
        const modifiedData = data.map((item) => ({
          ...item,
          status: item.status === false ? "Trống" : "Đang chiếu",
          seatsPerRow: item.seats.filter((seat) => seat.seatRow === "A").length,
          countScreening: screeningsByAuditorium[item.name] || 0,
        }));
        setRoomData(modifiedData);
      }
    }
    fetchRoomData();
  }, [type]);

  const handleChange = (type) => {
    setType(type);
  };
  return (
    <>
      <div className="flex min-h-[850px] h-auto flex-col md:px-[130px] w-full mt-[190px] pb-5">
        <h1 className="text-[#008E28] text-[32px] font-bold">PHÒNG CHIẾU</h1>
        <div className="w-full h-[0.8px] bg-[#092B4B] mt-5 mb-[40px]"></div>
        <button
          className="bg-[#092B4B] ms-[auto] text-[#fff] w-[230px] h-[50px] rounded-[8px] text-[17px] mb-[40px]"
          onClick={() => setOpenModal(true)}
        >
          <span className="me-[8px]">
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
          Thêm phòng
        </button>
        <div>
          {roomData && (
            <AuditoriumTable roomData={roomData} handleReload={handleChange} />
          )}
        </div>
      </div>
      {openModal && (
        <ModalAuditorium
          handleReload={handleReload}
          handleClose={() => setOpenModal(false)}
        ></ModalAuditorium>
      )}
    </>
  );
}

export default AuditoriumManagement;
