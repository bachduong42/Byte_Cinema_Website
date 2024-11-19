import { useEffect, useState } from "react";
import RevenueDaily from "./RevenueDaily";
import RevenueMonthly from "./RevenueMonth";

function Revenue() {
    const [currentMonth, setCurrentMonth] = useState("");
    const [currentYear, setCurrentYear] = useState("");
    useEffect(() => {
        const today = new Date();
        const formattedMonth = today.toISOString().slice(0, 7);
        const formattedYear = today.getFullYear(); // Get the current year
        setCurrentMonth(formattedMonth);
        setCurrentYear(formattedYear); // Set the current year
    }, []);

    const handleMonthChange = (event) => {
        setCurrentMonth(event.target.value);
    };
    const data = [
        {
            key: "1",
            date: "01-01-2024",
            revenue: 50000,
            totalTickets: 200,
            soldTickets: 150,
        },
        {
            key: "2",
            date: "02-01-2024",
            revenue: 62000,
            totalTickets: 300,
            soldTickets: 220,
        },
        {
            key: "3",
            date: "03-01-2024",
            revenue: 48000,
            totalTickets: 250,
            soldTickets: 200,
        },
        {
            key: "4",
            date: "04-01-2024",
            revenue: 52000,
            totalTickets: 270,
            soldTickets: 250,
        },
        {
            key: "5",
            date: "05-11-2024",
            revenue: 68000,
            totalTickets: 350,
            soldTickets: 300,
        },
        {
            key: "6",
            date: "06-11-2024",
            revenue: 45000,
            totalTickets: 240,
            soldTickets: 180,
        },
        {
            key: "7",
            date: "07-11-2024",
            revenue: 70000,
            totalTickets: 400,
            soldTickets: 370,
        },
    ];
    const dataMonth = [
        { month: "09/2023", revenue: 162000, totalTickets: 1020, soldTickets: 820 },
        { month: "10/2023", revenue: 485000, totalTickets: 1020, soldTickets: 820 },
        { month: "11/2023", revenue: 695200, totalTickets: 990, soldTickets: 850 },
        { month: "09/2024", revenue: 314000, totalTickets: 1020, soldTickets: 820 },
        { month: "10/2024", revenue: 314000, totalTickets: 1020, soldTickets: 820 },
        { month: "11/2024", revenue: 183000, totalTickets: 990, soldTickets: 850 }
    ]
    return (
        <div className="w-full flex-col flex h-auto min-h-screen px-5 pt-[150px] gap-5">
            <div>THỐNG KÊ DOANH THU</div>
            <div className="flex w-full justify-end px-5">
                {/* <input
                    value={currentMonth}
                    onChange={handleMonthChange}
                    type="month"
                    className="px-3 py-1 outline-none border border-[#ced5db] bg-[#f2f4f6] rounded-lg" /> */}
                <input
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    type="number"
                    min="2000"
                    max="2100"
                    className="px-3 py-1 outline-none border border-[#ced5db] bg-[#f2f4f6] rounded-lg" />
            </div>
            {/* <RevenueDaily data={data} month={currentMonth}></RevenueDaily> */}
            <RevenueMonthly data={dataMonth} year={currentYear}></RevenueMonthly>
        </div>
    );
}

export default Revenue;