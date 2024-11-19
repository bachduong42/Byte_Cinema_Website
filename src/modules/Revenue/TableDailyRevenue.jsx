import { Table } from "antd";

function TableDailyRevenue({ data, year }) {
    // const filteredData = year
    //     ? data.filter(item => item.month.split("/")[1] === year)
    //     : data;

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (value, record, index) => index + 1,
        },
        {
            title: year ? "Tháng" : "Ngày",
            dataIndex: year ? "month" : "date",
            key: year ? "month" : "date",
            sorter: (a, b) => {
                // Sort based on month format for "month" column or "date" column
                const dateA = new Date(year ? a.month : a.date);
                const dateB = new Date(year ? b.month : b.date);
                return dateA - dateB;
            },
        },
        {
            title: "Doanh thu (VND)",
            dataIndex: "revenue",
            key: "revenue",
            sorter: (a, b) => a.revenue - b.revenue,
            render: (value) => `${value.toLocaleString()} VND`,
        },
        {
            title: "Tổng vé",
            dataIndex: "totalTickets",
            key: "totalTickets",
            sorter: (a, b) => a.totalTickets - b.totalTickets,
        },
        {
            title: "Vé đã bán",
            dataIndex: "soldTickets",
            key: "soldTickets",
            sorter: (a, b) => a.soldTickets - b.soldTickets,
        },
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={{
                pageSize: 10,
            }}
            bordered
            title={() => "Bảng Thống Kê Doanh Thu Theo Ngày"}
            footer={() => `Tổng cộng: ${data
                .reduce((sum, record) => sum + record.revenue, 0)
                .toLocaleString()} VND`}
        />
    );
}

export default TableDailyRevenue;