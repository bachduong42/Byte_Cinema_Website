import { MdClose } from "react-icons/md";

function ModalNotifyLogin({ handleClose }) {
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
                        <div className="text-[23px] w-[450px] font-bold">Thông báo</div>
                        <MdClose
                            className="text-[20px] font-bold cursor-pointer"
                            onClick={handleClose}
                        />
                    </div>
                    <div className="flex flex-col gap-5 pt-8">
                        <div className="text-[23px] font-bold text-[#9E0000]">
                            Vui lòng đăng nhập để đưỢc đặt vé !!!
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalNotifyLogin;