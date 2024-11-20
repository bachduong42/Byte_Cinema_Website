import { Table } from "antd";
import { useState } from "react";
function RevenueTable({ revenueData }) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: "10%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên phim",
      dataIndex: "movieName",
      key: "movieName",
      width: "35%",
      filters: revenueData.map((revenue) => ({
        text: revenue.movieName,
        value: revenue.movieName,
      })),
      filteredValue: filteredInfo.movieName || null,
      onFilter: (value, record) => record.movieName.includes(value),
    },
    {
      title: "Doanh thu (VNĐ)",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      width: "25%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
      render: (value, record) =>
        `${(record.totalRevenue || 0).toLocaleString()}`,
    },
    {
      title: "Tổng vé",
      dataIndex: "totalTicket",
      key: "totalTicket",
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalTicket - b.totalTicket,
    },
    {
      title: "Vé đã bán",
      dataIndex: "totalTicketsSold",
      key: "totalTicketsSold",
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalTicketsSold - b.totalTicketsSold,
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={revenueData}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
        onChange={handleChange}
      ></Table>
    </>
  );
}

export default RevenueTable;
