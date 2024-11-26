import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { MdClose } from "react-icons/md";

function ModalChangePassword({ handleClose }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const handleSave = () => {
        const newErrors = {};

        if (!oldPassword) newErrors.oldPassword = "Vui lòng nhập mật khẩu.";
        if (!newPassword || newPassword.length < 6)
            newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự.";
        if (confirmPassword !== newPassword)
            newErrors.confirmPassword = "Mật khẩu không khớp.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("doi mat khau", { oldPassword, newPassword });
            handleClose();
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
                    className="modal w-[500px] h-fit pt-2 pb-5 flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center h-[70px]">
                        <div className="text-[23px] w-[450px] font-bold">Đổi mật khẩu</div>
                        <MdClose
                            className="text-[20px] font-bold cursor-pointer"
                            onClick={handleClose}
                        />
                    </div>
                    <hr className="w-[90%]" />
                    <div className="flex flex-col gap-3 pt-5 pb-5 w-full px-16">
                        <div className="flex flex-col gap-2">
                            <span className="text-start font-semibold">Mật khẩu cũ:</span>
                            <Input.Password
                                className="custom-password-input"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            {errors.oldPassword && (
                                <span className="text-red-500 text-[12px] leading-3 text-start">{errors.oldPassword}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-start font-semibold">Mật khẩu :</span>
                            <Input.Password
                                className="custom-password-input"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {errors.newPassword && (
                                <span className="text-red-500 text-[12px] leading-3 text-start">{errors.newPassword}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-start font-semibold">Nhập lại mật khẩu:</span>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="text" className="w-full h-[37px] outline-none border-none bg-[#dce1e6] rounded-md px-3" />
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-[12px] leading-3 text-start">{errors.confirmPassword}</span>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex gap-10 justify-center">
                        <button
                            onClick={handleClose}
                            className="w-[120px] border border-[#008E28] bg-white text-[#008E28] h-[37px] rounded-md">Huỷ</button>
                        <button
                            onClick={handleSave}
                            className="w-[120px]  bg-[#008E28]  text-white h-[37px] rounded-md">Lưu</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalChangePassword;