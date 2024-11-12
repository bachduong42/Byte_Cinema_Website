import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { addGenreRequest, getGenreByID, updateGenreRequest } from "../../services/genreService";
import { toast } from "react-toastify";

function ModalAddGenre({ handleClose, mode = "", idGenre = "", onSuccess }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        const fetchGenre = async () => {
            const res = await getGenreByID(idGenre);
            setName(res.name);
            setDescription(res.description)
        }
        if (idGenre) {
            fetchGenre();
        }
    }, [idGenre]);

    const [errors, setErrors] = useState({
        name: "",
        description: "",
    });
    const validateForm = () => {
        let formIsValid = true;
        let errors = {
            name: "",
            description: "",
        };

        if (!name) {
            formIsValid = false;
            errors.name = "Vui lòng điền tên thể loại";
        }

        if (!description) {
            formIsValid = false;
            errors.description = "Vui lòng điền mô tả";
        }
        setErrors(errors);
        return formIsValid;
    };
    const handleAddGenre = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            if (mode === "add") {
                await addGenreRequest(name, description);
                toast.success("Thêm thể loại thành công");
            } else {
                await updateGenreRequest(name, description, idGenre);
                toast.success("Cập nhật thể loại thành công");
            }
            onSuccess();
            handleClose();
        } catch (error) {
            toast.error("Đã có lỗi xảy ra");
        }

    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
            // onClick={handleClose}
            >
                <div
                    className="modal min-w-[550px] min-h-[400px] w-1/3 h-1/3 flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex pt-2 items-center h-[70px]">
                        <div className="text-[23px] w-[400px] text-[#0F3E4A] font-bold">
                            {mode === "add" ? "Thêm thể loại" : "Cập nhật"}
                        </div>
                        <MdClose
                            className="text-[20px] font-bold cursor-pointer"
                            onClick={handleClose}
                        />
                    </div>
                    <hr className="border-black border-[1px]" />
                    <form className="mt-5">
                        <div className="grid grid-cols-1 gap-1">

                            <div className="flex flex-col items-start row-span-4">
                                <div className="mb-3 text-[17px]">
                                    Tên thể loại<span className="text-[red] ml-1 text-[15px]">*</span>
                                </div>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                                />
                                <span className="text-red-500 text-[13px] h-[20px]">{errors?.name}</span>

                            </div>
                            <div className="flex flex-col items-start row-span-2">
                                <div className="mb-3 text-[17px]">
                                    Mô tả<span className="text-[red] ml-1 text-[15px]">*</span>
                                </div>
                                <input
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    className="w-full text-[18px] outline-none border border-gray-300 rounded-[8px] p-2"
                                />
                                <span className="text-red-500 text-[13px] h-[20px]">{errors?.description}</span>
                            </div>
                        </div>
                        <div className="flex pt-[10px] justify-center gap-[50px]">
                            <button
                                className="w-[150px] h-[42px] border-[1px] border-solid border-[#008E28] rounded-[8px] text-[#008E28] hover:opacity-90"
                                onClick={handleClose}
                            >
                                Huỷ
                            </button>
                            <button
                                className="w-[150px] h-[42px] border-[1px] border-solid bg-[#008E28] rounded-[8px] text-[#fff] hover:opacity-90"
                                onClick={handleAddGenre}
                            >
                                {mode === "add" ? "Thêm thể loại" : "Cập nhật"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ModalAddGenre;