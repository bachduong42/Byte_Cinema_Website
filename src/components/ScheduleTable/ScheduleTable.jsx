import React, { memo, useState } from "react";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ScheduleTable = ({ data, roomData }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const dataTable = data?.map((screening, index) => {
    const startTime = new Date(screening.startTime)
    const showDate = startTime.toLocaleDateString("en-GB");
    const showTime = startTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

    return {
      id: screening.id,
      key: index + 1,
      showDate,
      showTime,
      screenRoom: screening.auditoriumName,
      price: screening.ticketPrice,
      placed: "0",
    };
  });

  const uniqueShowDates = [...new Set(dataTable?.map((item) => item.showDate))];
  const showDateFilters = uniqueShowDates.map((date) => ({
    text: date,
    value: date,
  }));

  const uniqueRoomData = roomData?.filter(
    (room, index, self) => index === self.findIndex((r) => r.name === room.name)
  );

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
      filters: showDateFilters,
      filteredValue: filteredInfo.showDate || null,
      onFilter: (value, record) => record.showDate.includes(value),
      ellipsis: true,
    },
    {
      title: "Giờ chiếu",
      dataIndex: "showTime",
      width: "15%",
      key: "showTime",
    },
    {
      title: "Phòng chiếu",
      width: "15%",
      dataIndex: "screenRoom",
      key: "screenRoom",
      filters: uniqueRoomData.map((room) => ({
        text: room.name,
        value: room.name,
      })),
      filteredValue: filteredInfo.screenRoom || null,
      onFilter: (value, record) => record.screenRoom.includes(value),
    },
    {
      title: "Giá vé",
      dataIndex: "price",
      key: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
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
          id={record.id}
          onClick={() => handleUpdate(record.id)}
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
          id={record.id}
          onClick={() => handleUpdate(record.id)}
          className="text-[red] rounded px-4 py-2 text-[18px]"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={dataTable} onChange={handleChange} />
  );
};
export default memo(ScheduleTable);
