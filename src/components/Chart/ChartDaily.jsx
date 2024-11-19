import { Line } from "@ant-design/charts";
function ChartDaily({ data }) {
    
    const config = {
        data: data,
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