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
      dataIndex: "name",
      key: "name",
      width: "35%",
      filters: revenueData.map((revenue) => ({
        text: revenue.name,
        value: revenue.name,
      })),
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      width: "25%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
    },
    {
      title: "Tổng vé",
      dataIndex: "totalTickets",
      key: "totalTickets",
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalTickets - b.totalTickets,
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
