import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faCalendar, faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { reportRevenueByFilm, reportRevenueByMonth, reportRevenueByYear } from "../services/reportRevenue";
import RevenueTable from "../modules/Movie/RevenueTable";
import TableMonthRevenue from "../modules/Revenue/TableMonthRevenue";
import RevenueMonth from "../modules/Revenue/RevenueMonth";

function ReportRevenue() {
  const [type, setType] = useState("byFilm");
  const [data, setData] = useState([]);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    const today = new Date();
    const formattedMonth = today.toISOString().slice(0, 7);
    const formattedYear = today.getFullYear();
    setCurrentMonth(formattedMonth);
    setCurrentYear(formattedYear);
  }, []);
  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value);
  };
  function convertToISODate(monthString) {
    const date = new Date(`${monthString}-22T14:00:00Z`);
    return date.toISOString();
  }
  useEffect(() => {
    async function fetchApi() {
      console.log(type);
      if (type === "byFilm") {
        let dataRes = await reportRevenueByFilm();
        console.log(dataRes);
        if (dataRes) {
          setData(dataRes);
        }
      } else if (type === "byMonth") {
        const formattedMonth = convertToISODate(currentMonth);
        let dataMonth = await reportRevenueByMonth(formattedMonth);
        if (dataMonth) {
          setDataMonthly(dataMonth);
        }
      } else if (type === "byYear") {
        const formattedYear = convertToISODate(`${currentYear}-01`);
        let dataYear = await reportRevenueByYear(formattedYear);
        if (dataYear) {
          setDataYear(dataYear);
        }
      }
    }
    fetchApi();
  }, [type]);
  console.log(dataMonthly);
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
      {type === "byFilm" && <RevenueTable revenueData={data} />}
      {type === "byMonth" &&
        <div className="flex flex-col w-full">
          <div className="w-full mx-auto gap-10 justify-end flex">
            <input
              value={currentMonth}
              onChange={handleMonthChange}
              type="month"
              className="px-3 py-1 outline-none border border-[#ced5db] bg-[#f2f4f6] rounded-lg" />
          </div>
          <RevenueMonth revenueData={dataMonthly} month={currentMonth} />
        </div>
      }
      {type === "byYear" &&
        <div className="flex flex-col w-full">
          <div className="w-full mx-auto gap-10 justify-end flex">
            <input
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              type="number"
              min="2000"
              max="2100"
              className="px-3 py-1 outline-none border border-[#ced5db] bg-[#f2f4f6] rounded-lg" />
          </div>
          <RevenueMonth revenueData={dataYear} month={currentYear} isYear />
        </div>
      }
    </div>
  );
}

export default ReportRevenue;
