import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faCalendar, faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { reportRevenueByFilm } from "../services/reportRevenueByFilm";
import RevenueTable from "../modules/Movie/RevenueTable";

function ReportRevenue() {
  const [type, setType] = useState("byFilm");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      if (type === "byFilm") {
        let dataRes = await reportRevenueByFilm();
        dataRes = { id: 1, name: "Em và Trịnh", totalTickets: 20, ...dataRes };
        const dataRes2 = {
          id: 2,
          name: "Mắt biếc",
          totalTickets: 10,
          totalTicketsSold: 8,
          totalRevenue: 200000,
        };
        if (dataRes) {
          setData([dataRes, dataRes2]);
        }
      } else if (type === "byMonth") {
      } else if (type === "byYear") {
      }
    }
    fetchApi();
  });

  return (
    <div className="min-h-[850px] h-auto md:px-[130px] w-full mt-[150px] pb-5">
      <h1 className="text-[#092B4B] text-[32px] font-bold mb-3">
        THỐNG KÊ DOANH THU
      </h1>
      <div
        className="h-[1px] w-[100%] bg-[#092B4B]"
        style={{ margin: "0 auto" }}
      ></div>
      <div className="flex gap-x-5 mt-9 mb-10">
        <button
          className="flex gap-x-2 items-center text-[#006A97] border-[#006A97] border-[1px] rounded-[999px] py-2 px-6"
          style={
            type === "byFilm"
              ? { color: "white", backgroundColor: "#006A97" }
              : {}
          }
          onClick={() => setType("byFilm")}
        >
          <FontAwesomeIcon icon={faFilm} />
          <span className="text-[18px]">Theo phim</span>
        </button>
        <button
          className="flex gap-x-2 items-center text-[#006A97] border-[#006A97] border-[1px] rounded-[999px] py-2 px-6"
          style={
            type === "byMonth"
              ? { color: "white", backgroundColor: "#006A97" }
              : {}
          }
          onClick={() => setType("byMonth")}
        >
          <FontAwesomeIcon icon={faCalendar} />
          <span className="text-[18px]">Theo tháng</span>
        </button>
        <button
          className="flex gap-x-2 items-center text-[#006A97] border-[#006A97] border-[1px] rounded-[999px] py-2 px-6"
          style={
            type === "byYear"
              ? { color: "white", backgroundColor: "#006A97" }
              : {}
          }
          onClick={() => setType("byYear")}
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          <span className="text-[18px]">Theo năm</span>
        </button>
      </div>
      <RevenueTable revenueData={data} />
    </div>
  );
}

export default ReportRevenue;
