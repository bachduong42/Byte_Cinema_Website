import React, { memo, useRef, useState } from "react";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAuditorium from "../Modal/ModalAuditorium";
import ModalDelAuditorium from "../Modal/ModalDeleteAuditorium";

const AuditoriumTable = ({ roomData, handleReload }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);

  const idAuditorium = useRef();
  const dataTable = roomData;

  const uniqueRoomData = roomData?.filter(
    (room, index, self) => index === self.findIndex((r) => r.name === room.name)
  );

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleUpdate = (id) => {
    idAuditorium.current = id;
    setOpenModal(true);
  };
  const handleDel = (id) => {
    idAuditorium.current = id;
    setOpenModalDel(true);
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
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
      width: "15%",
      filters: uniqueRoomData.map((room) => ({
        text: room.name,
        value: room.name,
      })),
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Tổng số ghế",
      dataIndex: "capacity",
      width: "15%",
      key: "capacity",
    },
    {
      title: "Số ghế tối đa mỗi hàng",
      dataIndex: "seatsPerRow",
      width: "20%",
      key: "seatsPerRow",
    },
    {
      title: 'Số lượng suất chiếu',
      dataIndex: 'countScreening',
      key: 'countScreening',
    },
    {
      title: "Trạng thái",
      width: "10%",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Trống",
          value: "Trống",
        },
        {
          text: "Đang chiếu",
          value: "Đang chiếu",
        },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Cập nhật",
      width: "10%",
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
      width: "10%",
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
      {openModal && (
        <ModalAuditorium
          handleReload={handleReload}
          handleClose={() => setOpenModal(false)}
          idAuditorium={idAuditorium.current}
        ></ModalAuditorium>
      )}
      {openModalDel && (
        <ModalDelAuditorium
          handleReload={handleReload}
          idDel={idAuditorium.current}
          handleClose={() => setOpenModalDel(false)}
        ></ModalDelAuditorium>
      )}
    </>
  );
};
export default memo(AuditoriumTable);
