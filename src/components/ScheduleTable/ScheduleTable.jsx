import React, { memo, useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalDelScreening from "../Modal/ModalDeleteScreening";
import ModalEditScreening from "../Modal/ModalEditScreening";
import { countTicketByScreening } from "../../services/countTicketByScreening";

const ScheduleTable = ({ data, roomData, handleReload }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [countTicket, setCountTicket] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const idScreening = useRef();

useEffect(() => {
  async function fetchData() {
    const dataIds = data.map((item) => item.id);

    // Get the ticket counts for each screening ID
    const dataCounts = await Promise.all(
      dataIds.map((id) => countTicketByScreening(id))
    );

    // Create dataTb array with count included
    const dataTb = data?.map((screening, index) => {
      const startTime = new Date(screening.startTime);
      const showDate = startTime.toLocaleDateString("en-GB");
      const showTime = startTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      });
      const endTime = new Date(screening.endTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      });

      return {
        id: screening.id,
        key: index + 1,
        showDate,
        showTime,
        endTime,
        screenRoom: screening.auditoriumName,
        price: screening.ticketPrice,
        placed: dataCounts[index].toString(), // Assign the count to placed
      };
    });

    setDataTable(dataTb);
  }
  fetchData();
}, [data]);

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
  const handleUpdate = (id) => {
    idScreening.current = id;
    setOpenModalUpdate(true);
  };
  const handleDel = (id) => {
    idScreening.current = id;
    setOpenModalDel(true);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: "8%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Ngày chiếu",
      dataIndex: "showDate",
      key: "showDate",
      width: "13%",
      filters: showDateFilters,
      filteredValue: filteredInfo.showDate || null,
      onFilter: (value, record) => record.showDate.includes(value),
      ellipsis: true,
    },
    {
      title: "Giờ chiếu",
      dataIndex: "showTime",
      width: "10%",
      key: "showTime",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "endTime",
      width: "12%",
      key: "endTime",
    },
    {
      title: "Phòng chiếu",
      width: "13%",
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
      title: "Giá vé (VNĐ)",
      dataIndex: "price",
      key: "price",
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
      render: (value, record) => `${(record.price || 0).toLocaleString()}`,
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
      title: "Xoá",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <button
          id={record.id}
          onClick={() => handleDel(record.id)}
          className="text-[red] rounded px-4 py-2 text-[18px]"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataTable}
        onChange={handleChange}
        pagination={{ pageSize: 8, position: ["bottomCenter"] }}
      />
      {openModalUpdate && (
        <ModalEditScreening
          handleReload={handleReload}
          handleClose={() => setOpenModalUpdate(false)}
          idScreening={idScreening.current}
        ></ModalEditScreening>
      )}
      {openModalDel && (
        <ModalDelScreening
          handleReload={handleReload}
          idDel={idScreening.current}
          handleClose={() => setOpenModalDel(false)}
        ></ModalDelScreening>
      )}
    </>
  );
};
export default memo(ScheduleTable);
