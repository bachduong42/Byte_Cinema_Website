import ChartDaily from "../../components/Chart/ChartDaily";
import TableDailyRevenue from "./TableDailyRevenue";

function RevenueDaily({ data, month }) {
    const filteredData = data.filter((item) => {
        const itemMonth = item.date.slice(3, 10);
        return itemMonth === month.slice(5) + "-" + month.slice(0, 4);
    });
    return (
        <>
            <div className="w-[60%] mx-auto gap-10">
                <ChartDaily data={filteredData}></ChartDaily>
                <TableDailyRevenue data={filteredData}></TableDailyRevenue>
            </div>
        </>
    );
}

export default RevenueDaily;