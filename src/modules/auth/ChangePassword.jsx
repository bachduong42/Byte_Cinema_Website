import { useRef, useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { close, eyeOffOutline, eyeOutline } from "ionicons/icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { checkToken, resetPasswordService } from "../../services/login";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import config from "../../config";
import { MdOutlineWarningAmber } from "react-icons/md";

const ChangePassword = ({ openLoginModal }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
  const location = useLocation();
  const [token, setToken] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");
    console.log(tokenParam);
    const verifyToken = async () => {
      const isValidToken = await checkToken(tokenParam);
      setIsValid(isValidToken.info);
      setToken(tokenParam);

      console.log(isValidToken.info);
    };
    if (tokenParam) {
      verifyToken();
    }
  }, [location.search]);

  const isCPButtonEnabled =
    !newPassword ||
    !confirmNewPassword ||
    newPassword.length < 6 ||
    confirmNewPassword.length < 6 ||
    newPassword !== confirmNewPassword;

  const handleDirectToLoginClick = () => {
    setTimeout(() => {
      openLoginModal();
    }, 500);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const result = await resetPasswordService(token, newPassword);
      console.log("result", result);
      toast.success("Đặt lại mật khẩu thành công");
      navigate(config.routes.home);
      handleDirectToLoginClick();
    } catch (error) {
      console.log(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      toast.error("Vui lòng xác thực tài khoản email");
    }
  };

  const togglePasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible);
  };

  const validatePassword = () => {
    if (newPassword.length === 0) {
      setNewPasswordError("Vui lòng nhập mật khẩu");
    } else if (newPassword.length < 6) {
      setNewPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
    } else {
      setNewPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (confirmNewPassword.length === 0) {
      setConfirmNewPasswordError("Vui lòng nhập mật khẩu");
    } else if (confirmNewPassword.length < 6) {
      setConfirmNewPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
    } else if (confirmNewPassword !== newPassword) {
      setConfirmNewPasswordError("Mật khẩu không khớp");
    } else {
      setConfirmNewPasswordError("");
    }
  };

  return (
    <>
      <div className="flex flex-col h-[500px] w-1/3 mt-[150px] mx-auto">
        <div
          className={`w-full ${isValid ? "h-[350px]" : "h-[200px] border-yellow-300 "
            } border px-5 flex justify-center flex-col items-center mt-10 shadow-md`}
        >
          {isValid ? (
            <>
              <h2 className="text-center mb-[1rem] font-bold ">ĐỔI MẬT KHẨU</h2>
              <div className="w-full p-[20px mt-[30px]">
                <div className="input mb-[1.5rem]">
                  <div className="relative flex-row">
                    <input
                      type={isNewPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Mật khẩu mới"
                      required
                      className=" w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]"
                      onChange={(e) => setNewPassword(e.target.value)}
                      onBlur={validatePassword}
                      value={newPassword}
                    />

                    {newPassword.length > 0 && (
                      <div
                        className="absolute right-[51px] top-[50%] transform -translate-y-[11px]"
                        onClick={() => setNewPassword("")}
                      >
                        <IonIcon
                          className="text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer"
                        />
                      </div>
                    )}

                    <div
                      className="right-[11px] top-[50%] transform -translate-y-[11px] absolute"
                      onClick={togglePasswordVisibility}
                    >
                      <IonIcon
                        icon={isNewPasswordVisible ? eyeOutline : eyeOffOutline}
                        className="text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="ml-[15px] mt-[3px]">
                    <span
                      name="error"
                      id="password-error"
                      className="text-[13px] error text-red-600 text-start flex"
                    >
                      {" "}
                      {newPasswordError}
                    </span>
                  </div>
                </div>

                <div className="input mb-[1.5rem]">
                  <div className="relative flex-row">
                    <input
                      type={isConfirmNewPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Nhập lại mật khẩu mới"
                      required
                      className=" w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]"
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      onBlur={validateConfirmPassword}
                      value={confirmNewPassword}
                    />

                    {confirmNewPassword.length > 0 && (
                      <div
                        className="absolute right-[51px] top-[50%] transform -translate-y-[11px]"
                        onClick={() => setConfirmNewPassword("")}
                      >
                        <IonIcon

                          className="text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer"
                        />
                      </div>
                    )}

                    <div
                      className="right-[11px] top-[50%] transform -translate-y-[11px] absolute"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <IonIcon
                        icon={isNewPasswordVisible ? eyeOutline : eyeOffOutline}
                        className="text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="ml-[15px] mt-[3px]">
                    <span
                      name="error"
                      id="password-error"
                      className="text-[13px] error text-red-600 text-start flex"
                    >
                      {" "}
                      {confirmNewPasswordError}
                    </span>
                  </div>
                </div>

                <button
                  type="submit-button"
                  className="w-full text-base p-[10px] mt-[1rem] bg-[#e3e3e3] text-[rgba(0,0,0,0.5)] border-none cursor-pointer rounded-xl transition-all duration-500 ease-in-out"
                  disabled={isCPButtonEnabled}
                  style={{
                    backgroundColor: isCPButtonEnabled ? "#e3e3e3" : "#db9a45",
                  }}
                  onClick={handleChangePassword}
                >
                  Đổi mật khẩu
                </button>
              </div>
            </>
          ) : (
            <div className="justify-start gap-2 flex flex-col">
              <div className="flex gap-2">
                <MdOutlineWarningAmber className="text-yellow-500 text-[25px]" />
                <span className="font-bold">Expired token</span>
              </div>
              <span className="items-start flex justify-start text-start">
                Liên kết đã được sử dụng để đặt lại mật khẩu hoặc đã hết hạn
                thời gian thực hiện
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
