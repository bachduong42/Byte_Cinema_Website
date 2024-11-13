import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { addAuditorium } from "../../services/addAuditorium";
import { updateAuditorium } from "../../services/updateAuditorium";
import { toast } from "react-toastify";
import { getAuditorium } from "../../services/getAuditoriumById";

function ModalAuditorium({ handleClose, idAuditorium, handleReload }) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [seatsPerRow, setSeatsPerRow] = useState(0);
  const [roomData, setRoomData] = useState({});

  const [errors, setErrors] = useState({
    name: "",
    capacity: "",
    seatsPerRow: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {
      name: "",
      capacity: "",
      seatsPerRow: "",
    };

    if (!name) {
      formIsValid = false;
      errors.name = "Vui lòng nhập tên phòng";
    }

    if (!capacity || Number(capacity) <= 0) {
      formIsValid = false;
      errors.capacity = `Tổng số ghế phải lớn hơn 0`;
    }

    if (
      !seatsPerRow ||
      Number(seatsPerRow) <= 0 ||
      Number(seatsPerRow) > capacity
    ) {
      formIsValid = false;
      errors.seatsPerRow = `Số ghế mỗi hàng lớn hơn 0 và nhỏ hơn ${capacity}`;
    }

    setErrors(errors);
    return formIsValid;
  };

  useEffect(() => {
    if (idAuditorium) {
      async function fetchRoomData() {
        const data = await getAuditorium(idAuditorium);
        if (data) {
          setRoomData(data);
          setName(data.name);
          setCapacity(data.capacity);
          setSeatsPerRow(data.seats.filter(seat => seat.seatRow === 'A').length);
        }
      }
      fetchRoomData();
    }
  }, [idAuditorium]);

  const handleCancel = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      idAuditorium
        ? await updateAuditorium(idAuditorium, name)
        : await addAuditorium(name, capacity, seatsPerRow);
      toast.success(
        idAuditorium
          ? "Cập nhập thông tin thành công!"
          : '"Thêm phòng chiếu thành công"',
        {
          autoClose: 1000,
          position: "top-center",
        }
      );
      handleClose();
      handleReload(Date.now());
    } catch (message) {
      console.log(message);
      message === "Name is used"
        ? (message = "Tên phòng chiếu đã được sử dụng")
        : message === "Tên phòng chiếu đã được sử dụng"
        ? message
        : (message =
            "Phòng chiếu đang được sử dụng cho một vài suất chiếu. Vui lòng không cập nhật.");
      toast.error(message, { autoClose: 1300, position: "top-center" });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
      <div
        className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
        onClick={handleCancel}
      >
        <div
          className="modal min-w-[550px] min-h-[530px] w-1/3 h-1/3 flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex pt-2 items-center h-[70px]">
            <div className="text-[23px] w-[400px] text-[#0F3E4A] font-bold">
              {idAuditorium ? "Cập nhật phòng chiếu" : "Thêm phòng chiếu"}
            </div>
            <MdClose
              className="text-[20px] font-bold cursor-pointer"
              onClick={handleCancel}
            />
          </div>
          <hr className="border-black border-[1px]" />
          <form className="mt-1">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col items-start">
                <div className="mb-3 text-[17px]">
                  Tên phòng<span className="text-[red] ml-1">*</span>
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col items-start">
                <div className="mb-3 text-[17px]">
                  Tổng số ghế<span className="text-[red] ml-1">*</span>
                </div>
                <input
                  disabled={idAuditorium ? true : false}
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  type="number"
                  className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                />
                {errors.capacity && (
                  <span className="text-red-500">{errors.capacity}</span>
                )}
              </div>
              <div className="flex flex-col items-start">
                <div className="mb-3 text-[17px]">
                  Số ghế mỗi hàng<span className="text-[red] ml-1">*</span>
                </div>
                <input
                  disabled={idAuditorium ? true : false}
                  value={seatsPerRow}
                  onChange={(e) => setSeatsPerRow(e.target.value)}
                  type="number"
                  className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                />
                {errors.seatsPerRow && (
                  <span className="text-red-500">{errors.seatsPerRow}</span>
                )}
              </div>
            </div>
            <div className="flex pt-[40px] justify-center gap-[50px]">
              <button
                className="w-[150px] h-[42px] border-[1px] border-solid border-[#008E28] rounded-[8px] text-[#008E28] hover:opacity-90"
                onClick={handleCancel}
              >
                Huỷ
              </button>
              <button
                className="w-[150px] h-[42px] border-[1px] border-solid bg-[#008E28] rounded-[8px] text-[#fff] hover:opacity-90"
                onClick={handleSubmit}
              >
                {idAuditorium ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalAuditorium;
