import { useState, useEffect, useRef } from "react";
import Button from "../components/Button/Button";
import Bill from "../modules/Booking/Bill";
import SelectSeat from "../modules/Booking/SelectSeat";
import ConfirmSeat from "../modules/Booking/ConfirmSeat";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailFilm } from "../services/getDetailFilm";
import MovieSchedule from "../components/MovieSchedule/MovieSchedule";
import { toast } from "react-toastify";
import { createBookingRequest } from "../services/createBooking";
import { paymentRequest } from "../services/payment";
import { getAuditorium } from "../services/getAuditoriumById";
import getOrderedSeatsByScreeningId from "../services/getOrderedSeats";
// import BillSuccessfull from "../modules/Booking/BillSuccesfull";
import loadingSvg from '../assets/svgs/loading.svg'
function BookTicket() {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [screeningId, setScreeningId] = useState(0);
  //   const [auditorium, setAuditorium] = useState(null);
  // const [testSeats2, setTestSeats2] = useState([{ id: 91 }, { id: 92 }]);

  const [testSeats, setTestSeats] = useState([]);
  const [listIdSeats, setListIdSeats] = useState([]);

  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [billStartTime, setBillStartTime] = useState(null);
  const [auditoriumName, setAuditoriumName] = useState("Phòng");
  const [auditoriumId, setAuditoriumId] = useState(0);
  const [bookingId, setBookingId] = useState(0);
  const [auditoriumSeats, setAuditoriumSeats] = useState([]);
  const [orderedSeats, setOrderedSeats] = useState([]);

  const [isShowLoader, setIsShowLoader] = useState(false);
  // const overlayRef = useRef(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isOverlayClosing, setIsOverlayClosing] = useState(false);

  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);
      const movie = await getDetailFilm(id);
      if (movie) {
        setMovie(movie);
      }
      setIsLoading(false);
    }
    getMovie().then(() => console.log(movie));
  }, [id]);

  useEffect(() => {

  }, [screeningId]);

  
  async function _getOrderedSeatsByScreeningId(_screeningId) {
    const seats = await getOrderedSeatsByScreeningId(_screeningId);
    if (seats) {
      setOrderedSeats(seats);
      console.log(seats);
    }
  }
  

  async function getAuditoriumSeats(auditoriumId) {
    setIsLoading(true);
    const seats = await getAuditorium(auditoriumId);

    if (seats) {
      // console.log(seats.seats);
      setAuditoriumSeats(seats.seats);
      // console.log(auditoriumSeats);
    }
  }

  useEffect(() => {
    setTestSeats(listIdSeats.map((_id) => ({ id: _id })));
  }, [listIdSeats]);

  useEffect(() => {
    async function fetchPayment() {
      setIsLoading(true);
      if (bookingId !== 0) {
        console.log("Current Booking ID: ", bookingId);
        const res = await paymentRequest(
          localStorage.getItem("accessToken"),
          bookingId
        );
        if (res !== undefined) {
          console.log("Payment response: ", res);
          console.log("Payment URL: ", res.paymentUrl);
          setTimeout(() => {
            window.open(res.paymentUrl, "_self");
          }, 1500);
        }
      }
      setIsLoading(false);
      setBookingId(0);
    }
    fetchPayment();
  }, [bookingId]);

  //   useEffect(() => {
  //     async function fetchAuditorium() {
  //       const response = await fetch("http://localhost:8080/api/v1/auditorium/1");
  //       const result = await response.json();
  //       if (result.statusCode === 200) {
  //         setAuditorium(result.data);
  //       }
  //     }
  //     fetchAuditorium();
  //   }, []);

  const handleSelectScreening = (
    id,
    ticketPrice,
    startTime,
    auditoriumName,
    auditoriumId
  ) => {
    setIsOverlayOpen(true);
    setIsShowLoader(true);
    setScreeningId(id);
    
    _getOrderedSeatsByScreeningId(id);
    setSelectedTicketPrice(ticketPrice);
    setBillStartTime(startTime);
    setAuditoriumName(auditoriumName);
    getAuditoriumSeats(auditoriumId);

    setTimeout(() => {
      setIsOverlayClosing(true);
      setTimeout(() => {
        setIsOverlayOpen(false);
        setIsShowLoader(false);
        setIsOverlayClosing(false); // Reset for next use
      }, 500); // Match the animation duration
    }, 2500);
  };

  const seatsPerRow = 10;
  const totalSeats = 100;
  function generateSeatLayout(totalSeats, seatsPerRow) {
    const rows = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let remainingSeats = totalSeats;
    let currentRow = 0;

    while (remainingSeats > 0) {
      const seatsInRow = Math.min(seatsPerRow, remainingSeats);
      const rowSeats = [];

      for (let i = 1; i <= seatsInRow; i++) {
        rowSeats.push(`${alphabet[currentRow]}${i}`);
      }

      rows.push(rowSeats);
      remainingSeats -= seatsInRow;
      currentRow++;
    }

    return rows;
  }
  const seatLayout = generateSeatLayout(totalSeats, seatsPerRow);
  // console.log(seatLayout);
  const usedAlphabets = seatLayout.map((row) => row[0][0]);
  // console.log(usedAlphabets);
  const [currentStep, setCurrentStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState("");
  const [listSeats, setListSeats] = useState([]);

  const disableNextPageButton = listSeats.length === 0 || screeningId === 0;

  const handleNextPage = () => {
    if (currentStep < 4) {
      setSlideDirection("next");
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        console.log("next");
      }, 300);
      console.log(currentStep);
    }
  };

  const handleBackPage = () => {
    if (currentStep > 0) {
      setSlideDirection("prev");
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
      }, 300);
      console.log(listIdSeats);
      console.log(listSeats);
    }
  };

  const handleCreateBooking = async (event) => {
    event.preventDefault();
    console.log("Screening Id:", screeningId);
    console.log("Seats:", testSeats);
    try {
      const response = await createBookingRequest(
        localStorage.getItem("accessToken"),
        screeningId,
        testSeats
      );
      toast.success(
        "Đặt ghế thành công. Vui lòng hoàn thành thủ tục thanh toán",
        {
          autoClose: 1000,
        }
      );
      handleNextPage();

      console.log("Create Booking response: ", response);
      setBookingId(response.data.bookingId);

      // setTimeout(() => {
      //   setBookingId(response.data.bookingId);
      //   console.log("Booking ID: ", response.data.bookingId);
      // }, 2000);
      // const res = await paymentRequest(
      //   localStorage.getItem("accessToken"),
      //   bookingId
      // );
      // console.log("Payment response: ", res);

      // const vnPayUrl = res.data.paymentUrl;
      // console.log("VNPay URL: ", vnPayUrl);

      // const vnPayUrl = await paymentRequest()
      //   window.open("https://www.google.com", "_blank");

      // window.location.reload();
      //   navigate("/film-management");

      // } catch (error) {
      //   console.error(
      //     "Booking error: ",
      //     error.response?.data?.message || error.message
      //   );
      //   toast.error(`${error.response?.data?.message || error.message}`, {
      //     autoClose: 1000,
      //   });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes("already ordered")) {
        const seatMatch = errorMessage.match(/Seat\s(\w+\d+)/);
        const seatId = seatMatch ? seatMatch[1] : "unknown seat";
        toast.error(`Ghế ${seatId} đã được đặt`, {
          autoClose: 1000,
        });
      } else {
        toast.error(errorMessage, {
          autoClose: 1000,
        });
      }
      console.error("Booking error: ", errorMessage);

      throw error;
    }
  };

  return (
    <>
    <div className={`${isOverlayOpen ? 'modal-overlay ' : 'hidden'} ${isOverlayClosing ? 'closing' : ''}`}>
      <div className="modal-outer-box">
        {isShowLoader && <img src={loadingSvg} alt="Loading..." className="loader" />}
      </div>
    </div>
      <div className="min-h-[800px] h-auto flex flex-col mt-[115px] justify-start w-full lg:px-16 pt-5 pb-10">
        <div className="text-3xl mb-[15px] font-bold text-[#092b4b] text-start">
          Đặt vé
        </div>
        <div className="w-full justify-center items-center flex flex-col gap-2">
          <div className="w-[80%] h-[15px] border border-gray rounded-[23px] bg-[#ced5db] text-center flex">
            <div className="w-1/4 h-full bg-[#284662] rounded-s-3xl"></div>
            <div
              className={`w-1/4 h-full ${
                currentStep === 2 || currentStep === 4 || currentStep === 3
                  ? "bg-[#284662]"
                  : "bg-[#576f85]"
              }`}
            ></div>
            <div
              className={`w-1/4 h-full ${
                currentStep === 2 ? "bg-[#576f85]" : ""
              } ${
                currentStep === 4 || currentStep === 3 ? "bg-[#284662]" : ""
              }`}
            ></div>
            <div
              className={`w-1/4 h-full ${
                currentStep === 4 ? "bg-[#284662]" : ""
              } ${currentStep === 3 ? "bg-[#576f85]" : ""}`}
            ></div>
          </div>
          <div className="w-[80%] h-[15px]  text-center flex">
            <div className="w-1/4 h-full font-bold text-[18px] text-[#092b4b]">
              Chọn suất
            </div>
            <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">
              Chọn ghế
            </div>
            <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">
              Xác nhận
            </div>
            <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">
              Thanh toán
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 w-full h-full mt-10">
          <div
            className={`flex flex-col px-10 ${
              currentStep === 4 ? "w-full" : "lg:w-3/4 w-3/5 "
            }`}
          >
            {currentStep === 1 && movie?.screenings && (
              <SelectSeat
                rows={usedAlphabets}
                seatsPerRow={seatsPerRow}
                totalSeats={totalSeats}
                listSeats={listSeats}
                setListSeats={setListSeats}
                schedule={movie.screenings.filter((screening) => {
                  const currentTime = new Date();
                  const endTime = new Date(screening.endTime);
                  return endTime > currentTime;
                })}
                onClick={handleSelectScreening}
                listSeatIds={listIdSeats}
                setlistSeatIds={setListIdSeats}
                auditoriumName={auditoriumName}
                orderedSeats={orderedSeats}
                auditoriumSeats={auditoriumSeats}

                // chosenSeats={chosenSeats}
                // setChosenSeats={setChosenSeats}
              ></SelectSeat>
            )}
            {currentStep == 2 && <ConfirmSeat></ConfirmSeat>}
            {/* {currentStep == 3 && <ConfirmSeat></ConfirmSeat>} */}
            {/* {currentStep == 4 && <BillSuccessfull listSeats={listSeats} billSuccess></BillSuccessfull>} */}
            <div className="w-[80%] border border-t-[#576f85] border-t-0 mx-auto my-2"></div>

            <div className="flex gap-16 pt-3 justify-center mt-5">
              {currentStep !== 1 && (
                <button
                  onClick={handleBackPage}
                  className="bg-white text-base rounded-[5px] text-black border-[#092b4b] border md:w-[120px] md:h-[35px] "
                >
                  Quay lại
                </button>
              )}
              <Button
                disabled={disableNextPageButton}
                onClick={
                  currentStep == 2 ? handleCreateBooking : handleNextPage
                }
                className={`bg-[#092b4b] rounded-[5px]  md:w-[120px] md:h-[35px] w-[80px] h-[25px] text-white ${
                  disableNextPageButton ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {currentStep === 1 ? "Tiếp theo" : "Xác nhận"}
              </Button>
            </div>
          </div>
          <Bill
            listSeats={listSeats}
            name={movie.name}
            imgSrc={movie.imagePaths ? movie.imagePaths?.[0] : null}
            duration={movie.duration}
            nation={movie.nation}
            ticketPrice={selectedTicketPrice}
            startTime={billStartTime}
            auditoriumName={auditoriumName}
          ></Bill>
        </div>
      </div>
      {/* {movie?.screenings && (
        <MovieSchedule data={groupScreeningsByDate(movie.screenings)} />
      )} */}
    </>
  );
}

export default BookTicket;
