import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "antd";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAddGenre from "../Genre/ModalAddGenre";
import { useRef, useState } from "react";
function GenreTable({ movieGenres, fetchGenres }) {
    // console.log(movieGenres);
    const idGenre = useRef();
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalDel, setOpenModalDel] = useState(false);
    const handleUpdate = (id) => {
        idGenre.current = id;
        setOpenModalUpdate(true);
    };
    const handleDel = (id) => {
        idGenre.current = id;
        setOpenModalDel(true);
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
            title: 'Thể loại',
            dataIndex: 'name',
            key: 'name',
            width: "20%",
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: "30%",
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
                    // onClick={() => handleDel(record.id)}
                    className="text-[red] rounded px-4 py-2 text-[18px]"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            ),
        },
    ]
    return (
        <>
            <Table
                columns={columns} dataSource={movieGenres}
                pagination={{ pageSize: 5, position: ["bottomCenter"] }}
            ></Table>
            {openModalUpdate && (
                <ModalAddGenre
                    handleClose={() => setOpenModalUpdate(false)}
                    idGenre={idGenre.current}
                    onSuccess={fetchGenres}
                ></ModalAddGenre>
            )}
        </>
    );
}

export default GenreTable;