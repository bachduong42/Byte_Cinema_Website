import { Table } from "antd";
import dayjs from "dayjs";

function TableMonthRevenue({ revenueData, isYear }) {

    const filteredData = revenueData.filter(item => item.totalRevenue > 0);
    console.log(revenueData)
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (value, record, index) => index + 1,
        },

        {
            title: isYear ? "Tháng" : "Ngày",
            dataIndex: "time",
            key: "time",
            render: (value, record) => {

                return isYear
                    ? dayjs(record.time).format("MM-YYYY")
                    : dayjs(record.time).format("DD-MM-YYYY");
            },
        },
        {
            title: "Doanh thu (VND)",
            dataIndex: "revenue",
            key: "revenue",
            sorter: (a, b) => (a.totalRevenue || 0) - (b.totalRevenue || 0),
            render: (value, record) => `${(record.totalRevenue || 0).toLocaleString()} VND`,
        },
        {
            title: "Tổng vé",
            dataIndex: "totalTickets",
            key: "totalTickets",
            sorter: (a, b) => (a.totalTickets || 0) - (b.totalTickets || 0),
        },
        {
            title: "Vé đã bán",
            dataIndex: "soldTickets",
            key: "soldTickets",
            sorter: (a, b) => (a.soldTickets || 0) - (b.soldTickets || 0),
        },
    ];


    return (
        <Table
            dataSource={filteredData.map((item, index) => ({
                key: index,
                time: item.time,
                totalRevenue: item.totalRevenue,
                totalTickets: item.totalTicket,
                soldTickets: item.totalTicketsSold,
            }))}
            columns={columns}
            pagination={{
                pageSize: 10,
            }}
            bordered
            title={() => "Bảng Thống Kê Doanh Thu Theo Tháng"}
            footer={() => {
                const totalRevenue = filteredData.reduce(
                    (sum, record) => sum + (record.totalRevenue || 0),
                    0
                );
                return `Tổng cộng: ${totalRevenue.toLocaleString()} VND`;
            }}
        />
    );
}

export default TableMonthRevenue;