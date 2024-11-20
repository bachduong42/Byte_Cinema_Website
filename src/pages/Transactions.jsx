import { useState, useEffect, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import getPaidBookingsRequest from "../services/getPaidBookings";
import getBookingRequest from "../services/getBooking";
import loadingSvg from "../assets/svgs/loading.svg";
import BillTransaction from "../modules/Booking/BillTransaction";
import { chevronBack, chevronForward } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export const Transactions = () => {
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyScreening, setIsAlreadyScreening] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [chosenBooking, setChosenBooking] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const overlayRef = useRef(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const modalRef = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isOverlayClosing, setIsOverlayClosing] = useState(false);

  useEffect(() => {
    async function getTransactions() {
      //   setIsLoading(true);
      const myData = await getPaidBookingsRequest(
        isAlreadyScreening,
        currentPage
      );

      if (myData) {
        // console.log(myData);
        const indexedData = myData.result.map((item, index) => ({
          ...item,
          index: index + 1,
          screeningTime: getTimeFromDateTime(item.startTime),
          screeningDate: getDateFromDateTime(item.startTime),
        }));
        setData(indexedData);
        setPaginationInfo(myData.meta);
      }
      //   setIsLoading(false);
    }
    getTransactions();
  }, [isAlreadyScreening, currentPage]);

  function getTimeFromDateTime(dateTime) {
    const [timePart] = dateTime.split(" ");
    return timePart;
  }

  function getDateFromDateTime(dateTime) {
    const [, datePart] = dateTime.split(" ");
    const [day, month, year] = datePart.split("-");
    return `${day}/${month}/${year}`;
  }

  async function getBooking(id) {
    try {
      setIsOverlayOpen(true);
      setIsShowLoader(true);
      const booking = await getBookingRequest(id);

      if (booking) {
        setIsShowLoader(false);
        setIsShowModal(true);
        console.log(booking);
        setChosenBooking(booking);
      }
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  }

  const closeOverlay = (e) => {
    if (e.target === overlayRef.current) {
      setChosenBooking;
      setIsOverlayClosing(true);
      setTimeout(() => {
        setIsOverlayOpen(false);
        setIsShowModal(false);
        setChosenBooking({});
        // setIsCameraOn(true);
        setIsOverlayClosing(false);
      }, 300);
    }
  };

  const nextPageHandler = () => {
    if (currentPage === paginationInfo.pages) return;
    setIsOverlayOpen(true);
    setIsShowLoader(true);
    setCurrentPage((page) => page + 1);
    timedOutHandler();
  };

  const previousPageHandler = () => {
    if (currentPage === 1) return;
    setIsOverlayOpen(true);
    setIsShowLoader(true);
    setCurrentPage((page) => page - 1);
    timedOutHandler();
  };

  const timedOutHandler = () => {
    setTimeout(() => {
      setIsOverlayClosing(true);
      setIsShowLoader(false);
      setTimeout(() => {
        setIsOverlayOpen(false);

        setIsOverlayClosing(false); // Reset for next use
      }, 500); // Match the animation duration
    }, 3500);
  };

  function isAlreadyScreeningHandler(_isAlreadyScreened) {
    setIsOverlayOpen(true);
    setIsShowLoader(true);
    setIsAlreadyScreening(_isAlreadyScreened);
    setCurrentPage(1);
    timedOutHandler();
  }

  const columns = [
    {
      header: "STT",
      accessorKey: "index",
    },
    {
      header: "Ngày chiếu",
      accessorKey: "screeningDate",
    },
    {
      header: "Thời gian",
      accessorKey: "screeningTime",
    },
    {
      header: "Phim",
      accessorKey: "nameMovie",
    },
    {
      header: "Chi tiết",
      accessorKey: "action",
      cell: ({ row }) => (
        <button
          onClick={() => getBooking(row.original.bookingId)}
          className="text-[#4F646F] underline"
        >
          Xem
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex-1 bg-[#092B4B] pt-[111px]">
        {isOverlayOpen && (
          <>
            {/* <div className="modal-overlay" onClick={closeOverlay} ref={overlayRef}> */}
            <div
              className={`modal-overlay ${isOverlayOpen ? "open" : ""} ${
                isOverlayClosing ? "closing" : ""
              }`}
              onClick={closeOverlay}
              ref={overlayRef}
            >
              <div className="modal-outer-box">
                {isShowLoader && (
                  <img src={loadingSvg} alt="Loading..." className="loader" />
                )}
                {isShowModal && (
                  <div className="modal-inner-box" ref={modalRef}>
                    <div className="modal-content">
                      <BillTransaction
                        listSeats={chosenBooking.nameSeats}
                        billSuccess={true}
                        name={chosenBooking.nameMovie}
                        duration={chosenBooking.duration}
                        nation={chosenBooking.nation}
                        seatsNumber={chosenBooking.seatsNumber}
                        ticketPrice={chosenBooking.formattedPerTicketPrice}
                        totalPrice={chosenBooking.formattedTotalPrice}
                        auditorium={chosenBooking.nameAuditorium}
                        startTime={chosenBooking.startTime}
                        imgSrc={chosenBooking.representativeMovieImage}
                        language={chosenBooking.language}
                      ></BillTransaction>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className="bg-white py-[40px]">
          <div className="w-[75%] mx-auto p-6 bg-white rounded-md shadow-md min-h-[750px]">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
              LỊCH SỬ GIAO DỊCH
            </h2>
            <div
              id="description-title"
              className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
            >
              <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                Thông tin
              </h1>
            </div>

            <div className="flex flex-row items-center justify-center gap-20 mb-10">
              <div
                onClick={() => isAlreadyScreeningHandler(false)}
                disabled = {isAlreadyScreening===false }
                className={` px-3 py-2 rounded ${
                    isAlreadyScreening == false
                    ? "bg-[#4e60b8] text-white cursor-not-allowed"
                    : "bg-[#97ABB1] text-white cursor-pointer"
                }`}
              >
                Sắp chiếu
              </div>
              <div
                onClick={() => isAlreadyScreeningHandler(true)}
                disabled = {isAlreadyScreening===true }
                className={`px-3 py-2 rounded ${
                    isAlreadyScreening == true
                    ? "bg-[#4e60b8] text-white cursor-not-allowed"
                    : "bg-[#97ABB1] text-white cursor-pointer"
                }`}
                
              >
                Đã chiếu
              </div>
            </div>

            <table className="min-w-full bg-white">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-row mt-[30px] items-center justify-center">
              <div
                onClick={previousPageHandler}
                disabled={currentPage <= 1}
                className={`flex items-center justify-center px-4 py-2 rounded w-[50px] mx-2 ${
                  paginationInfo.page <= 1
                    ? "bg-[#97ABB1] text-[#88898d] cursor-not-allowed"
                    : "bg-[#4e60b8] text-white cursor-pointer"
                }`}
              >
                <IonIcon icon={chevronBack} className="text-2xl" />
              </div>
              <span className="mx-[20px] w-[50px]">
                <strong>{currentPage}</strong>
              </span>
              <div
                onClick={nextPageHandler}
                disabled={paginationInfo.page >= paginationInfo.pages}
                className={`flex items-center justify-center px-4 py-2 rounded w-[50px] mx-2 ${
                    currentPage >= paginationInfo.pages
                    ? "bg-[#97ABB1] text-[#88898d] cursor-not-allowed"
                    : "bg-[#4e60b8] text-white cursor-pointer"
                }`}
              >
                <IonIcon icon={chevronForward} className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
