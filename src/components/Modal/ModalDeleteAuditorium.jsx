import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteAuditorium } from "../../services/deleteAuditorium";
function ModalDelAuditorium({ handleClose, idDel, handleReload }) {
  const handleDeleteScreening = async () => {
    try {
      await deleteAuditorium(idDel);
      toast.success("Xoá phòng chiếu thành công", {
        autoClose: 1000,
        position: "top-center",
      });
      handleClose();
      handleReload(Date.now());
    } catch (message) {
      handleClose();
      message === "Auditorium is used in screening"
        ? (message = "Phòng chiếu đang được sử dụng. Không thể xoá!")
        : "Đã có lỗi xảy ra. Vui lòng thử lại!";
      toast.error(message, {
        autoClose: 1200,
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
      <div
        className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
        onClick={handleClose}
      >
        <div
          className="modal min-w-[550px] min-h-[300px] w-1/3 h-1/3 flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex pt-2 items-center h-[70px]">
            <div className="text-[23px] w-[450px] font-bold">Cảnh báo</div>
            <MdClose
              className="text-[20px] font-bold cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="flex flex-col gap-5 pt-8">
            <div className="text-[23px] font-bold text-[#9E0000]">
              Bạn có chắc muốn xóa phòng chiếu này không?
            </div>
            <div className="text-[18px] text-black font-semibold">
              Sau khi xóa bạn sẽ không thể khôi phục lại!
            </div>
          </div>
          <div className="flex pt-[30px] justify-center gap-[50px]">
            <button
              className="w-[150px] h-[42px] border-[1px] border-solid border-[#9E0000] rounded-[8px] text-[#9E0000] hover:opacity-90"
              onClick={handleClose}
            >
              Huỷ
            </button>
            <button
              className="w-[150px] h-[42px] border-[1px] border-solid bg-[#9E0000] rounded-[8px] text-[#fff] hover:opacity-90"
              onClick={handleDeleteScreening}
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDelAuditorium;
