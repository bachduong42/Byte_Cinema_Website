import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { changePassword } from "../../services/login";
import { FadeLoader } from "react-spinners";

function ModalChangePassword({ handleClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const handleSave = async () => {
    const newErrors = {};

    // Kiểm tra mật khẩu cũ
    if (!oldPassword) {
      newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ.";
    }

    // Kiểm tra mật khẩu mới
    if (!newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
    } else if (newPassword === oldPassword) {
      newErrors.newPassword = "Mật khẩu mới không được trùng với mật khẩu cũ.";
    } else if (!/[a-z]/.test(newPassword)) {
      newErrors.newPassword =
        "Mật khẩu mới phải chứa ít nhất một chữ cái thường.";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Mật khẩu mới phải chứa ít nhất một chữ số.";
    } else if (!/[@$!%*?&]/.test(newPassword)) {
      newErrors.newPassword =
        "Mật khẩu mới phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &).";
    }

    // Kiểm tra mật khẩu xác nhận
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword =
        "Mật khẩu xác nhận không khớp với mật khẩu mới.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      try {
        const response = await changePassword(
          oldPassword,
          newPassword,
          confirmPassword
        );
        setIsLoading(false)
        console.log(response);
        if (response.statusCode === 200) {
          toast.success("Đổi mật khẩu thành công!", { autoClose: 800 });
          handleClose();
        }
      } catch (error) {
        setIsLoading(false)
        toast.error("Mật khẩu không đúng. Vui lòng thử lại!", {
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div
          className="flex justify-center items-center w-full h-[full]"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.15)",
          }}
        >
          <FadeLoader loading={isLoading} />
        </div>
      )}
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
              <span className="text-start font-semibold">
                Mật khẩu cũ<span className="text-[red] ml-[2px]">*</span>
              </span>
              <Input.Password
                className="custom-password-input"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {errors.oldPassword && (
                <span className="text-red-500 text-[12px] leading-3 text-start">
                  {errors.oldPassword}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-start font-semibold">
                Mật khẩu mới<span className="text-[red] ml-[2px]">*</span>
              </span>
              <Input.Password
                className="custom-password-input"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-[12px] leading-3 text-start">
                  {errors.newPassword}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-start font-semibold">
                Nhập lại mật khẩu<span className="text-[red] ml-[2px]">*</span>
              </span>
              <Input.Password
                className="custom-password-input"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-[12px] leading-3 text-start">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex gap-10 justify-center">
            <button
              onClick={handleClose}
              className="w-[120px] border border-[#008E28] bg-white text-[#008E28] h-[37px] rounded-md"
            >
              Huỷ
            </button>
            <button
              onClick={handleSave}
              className="w-[120px]  bg-[#008E28]  text-white h-[37px] rounded-md"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalChangePassword;