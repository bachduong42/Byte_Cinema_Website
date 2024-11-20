import ChartDaily from "../../components/Chart/ChartDaily";
import TableMonthRevenue from "./TableMonthRevenue";

function RevenueMonth({ revenueData, month, isYear }) {
    function filterByMonth(data, month) {
        return data.filter(item => item.time.startsWith(month));
    }
    const filteredData = filterByMonth(revenueData, month);
    return (
        <>
            <div className="w-full mx-auto gap-10">
                <TableMonthRevenue revenueData={filteredData} isYear={isYear}></TableMonthRevenue>
                <ChartDaily data={filteredData}></ChartDaily>
            </div>
        </>
    );
}

export default RevenueMonth;