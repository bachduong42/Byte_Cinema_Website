import React, { useState } from "react";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
const data = [
  {
    key: "1",
    showDate: "11-10-2024",
    showTime: "10:00",
    screenRoom: "Phòng 1",
    price: 100000,
    placed: "35/40",
  },
  {
    key: "1",
    showDate: "31-10-2024",
    showTime: "10:00",
    screenRoom: "Phòng 4",
    price: 100000,
    placed: "0",
  },
  {
    key: "3",
    showDate: "30-10-2024",
    showTime: "12:00",
    screenRoom: "Phòng 2",
    price: 100000,
    placed: "0",
  },
  {
    key: "4",
    showDate: "11-10-2024",
    showTime: "10:00",
    screenRoom: "Phòng 1",
    price: 100000,
    placed: "35/40",
  },
];
const ScheduleTable = () => {
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
      width: "5%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Ngày chiếu",
      dataIndex: "showDate",
      key: "showDate",
      width: "20%",
      filters: [
        {
          text: "11-10-2024",
          value: "11-10-2024",
        },
        {
          text: "30-10-2024",
          value: "30-10-2024",
        },
      ],
      filteredValue: filteredInfo.showDate || null,
      onFilter: (value, record) => record.showDate.includes(value),
      ellipsis: true,
    },
    {
      title: "Giờ chiếu",
      dataIndex: "showTime",
      width: "15%",
      key: "showTime"
    },
    {
      title: "Phòng chiếu",
      width: "15%",
      dataIndex: "screenRoom",
      key: "screenRoom",
      filters: [
        {
          text: "Phòng 1",
          value: "Phòng 1",
        },
        {
          text: "Phòng 2",
          value: "Phòng 2",
        },
      ],
      filteredValue: filteredInfo.screenRoom || null,
      onFilter: (value, record) => record.screenRoom.includes(value),
    },
    {
      title: "Giá vé",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Vé đã đặt",
      dataIndex: "placed",
      key: "placed",
    },
    {
      title: "Cập nhật",
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <button
          id={record.showtimeId}
          onClick={() => handleUpdate(record.showtimeId)}
          className="text-[orange] rounded px-4 py-2 text-[18px]"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <button
          id={record.showtimeId}
          onClick={() => handleUpdate(record.showtimeId)}
          className="text-[red] rounded px-4 py-2 text-[18px]"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default ScheduleTable;
