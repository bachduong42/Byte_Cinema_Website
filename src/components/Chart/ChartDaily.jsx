import { Line } from "@ant-design/charts";
import dayjs from "dayjs";
function ChartDaily({ data }) {
    const formattedData = data.map(item => ({
        date: dayjs(item.time).format("DD-MM-YYYY"),
        revenue: item.totalRevenue,
    }));
    const config = {
        data: formattedData,
        xField: "date",
        yField: "revenue",
        xAxis: {
            title: {
                text: "Ngày",
            },
            label: {
                formatter: (text) => text,
            },
        },
        yAxis: {
            title: {
                text: "Doanh thu (VND)",
            },
            label: {
                formatter: (value) => `${(value / 1000).toFixed(1)}K`,
            },
        },
        color: ["#409EFF"],
        smooth: true,
        point: {
            size: 5,
            shape: "circle",
        },
    };

    return <Line {...config} />;
}

export default ChartDaily;