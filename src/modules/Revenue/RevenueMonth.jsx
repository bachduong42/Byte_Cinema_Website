import TableDailyRevenue from "./TableDailyRevenue";

function RevenueMonthly({ data, year }) {

    return (
        <>
            <div className="w-[60%] mx-auto gap-10">
                {/* <ChartDaily data={filteredData}></ChartDaily> */}
                <TableDailyRevenue data={data} year={year}></TableDailyRevenue>
            </div>
        </>
    );
}

export default RevenueMonthly;