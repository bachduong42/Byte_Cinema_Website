import { useRef, useState, useEffect, useContext } from "react";
import { IonIcon } from "@ionic/react";
import { close, closeSharp } from "ionicons/icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import logo from "../../assets/images/logo.png";
import { verifyOTP } from "../../services/verifyOTP";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { resendOTP } from "../../services/resendOTP";

const ChangeOtp = ({ setModalRef, openLoginModal }) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendTimeout, setResendTimeout] = useState(0);
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(true);

  const overlayRef = useRef();
  const outerBoxRef = useRef();
  const fadeAnimateRef = useRef();
  const chibiContainerRef = useRef();
  const tlRef = useRef();
  const timerRef = useRef(null);
  const { getEmail } = useContext(UserContext);

  const isVerifyOtpButtonEnabled = !otp || otp.length < 6;

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(overlayRef.current, { display: "flex" })
      // .call(startCountdown)
      .from(overlayRef.current, {
        duration: 0.3,
        backgroundColor: "rgba(0,0,0,0)",
        ease: "expo.out",
      })
      .from(outerBoxRef.current, { duration: 0.3, scaleY: 0, ease: "expo.out" })
      .from(fadeAnimateRef.current, {
        duration: 0.3,
        opacity: 0,
        ease: "power4.out",
      })
      .from(
        chibiContainerRef.current,
        { duration: 0.7, yPercent: 100, ease: "power4.out" },
        1
      );
    tlRef.current = tl;
  }, []);

  useEffect(() => {
    setModalRef({
      openConfirmOtpModal,
    });
  }, [setModalRef]);

  const startCountdown = () => {
    setResendTimeout(15);
    setIsResendButtonDisabled(true);

    timerRef.current = setInterval(() => {
      setResendTimeout((prevTimeout) => {
        if (prevTimeout <= 1) {
          clearInterval(timerRef.current);
          setIsResendButtonDisabled(false);
          return 0;
        }
        return prevTimeout - 1;
      });
    }, 1000);
  };

  const openConfirmOtpModal = () => {
    tlRef.current.restart();
    startCountdown();
  };

  const closeConfirmOtpModal = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    tlRef.current.reverse();

    setTimeout(() => {
      setOtp("");
      setOtpError("");
      setResendTimeout(0);
      setIsResendButtonDisabled(true);
    }, 700);
  };

  const handleConfirm = async () => {
    try {
      await verifyOTP(getEmail(), otp);
      toast.success("Xác nhận OTP thành công!");
      setOtp("");
      closeConfirmOtpModal();
      setTimeout(() => {
        openLoginModal();
      }, 500);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    console.log("Resend OTP");
    await startCountdown();
    try {
      const data = await resendOTP(getEmail());
      toast.success("Kiểm tra lại email để nhận OTP");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    console.log("OTP:", otp);
    handleConfirm();
  };

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      closeConfirmOtpModal();
    }
  };

  const validateOtp = () => {
    if (otp.length === 0) {
      setOtpError("Vui lòng nhập OTP");
    } else if (otp.length !== 6) {
      setOtpError("OTP phải có 6 kí tự");
    } else {
      setOtpError("");
    }
  };

  return (
    <>
      <div
        id="fp-overlay"
        ref={overlayRef}
        className="fixed z-5 inset-0 bg-[rgba(0,0,0,0.5)]  items-center justify-center hidden"
        onMouseDown={handleOverlayClick}
      >
        <div
          id="fp-outer-box"
          ref={outerBoxRef}
          className="relative w-[30rem] items-center justify-center self-center"
        >
          <div
            id="chibi-container"
            className="relative w-full h-[130px]"
            ref={chibiContainerRef}
          >
            <img
              id="chibi-img default-img active"
              src={logo}
              alt="chibi"
              className="block absolute w-[150px] left-1/2 top-full -translate-x-1/2 logo-login-modal transition-all duration-500 ease-in-expo"
            />
          </div>

          <div
            id="fp-inner-box"
            className="relative z-2 bg-white rounded-xl h-full p-[20px]"
          >
            <div
              id="close-div"
              className="w-full h-max mb-[1rem] flex justify-end"
              onClick={closeConfirmOtpModal}
            >
              <IonIcon
                icon={close}
                id="close"
                className="text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer"
              />
            </div>

            <div className="fade-animate" ref={fadeAnimateRef}>
              <h2 className="text-center mb-[1rem]">XÁC NHẬN OTP</h2>
              <div className="w-full p-[20px]">
                <div className="input mb-[1.5rem] mt-[1rem]">
                  <div className="relative flex-row">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Nhập OTP"
                      required
                      className=" w-8/12 px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]"
                      onChange={(e) => setOtp(e.target.value)}
                      onBlur={validateOtp}
                      value={otp}
                      maxLength={6}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />

                    {otp.length > 0 && (
                      <div
                        className={`absolute top-[50%] transform -translate-y-[3px] right-[30%] -translate-x-[10px]`}
                        onClick={() => setOtp("")}
                      >
                        <IonIcon
                          icon={closeSharp}
                          className="text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      className="w-1/4 ml-[0.5rem] text-base p-[10px] mt-[1rem] bg-[#e3e3e3] text-[rgba(0,0,0,0.5)] border-none cursor-pointer rounded-xl transition-all duration-500 ease-in-out"
                      disabled={isResendButtonDisabled}
                      style={{
                        backgroundColor: isResendButtonDisabled
                          ? "#e3e3e3"
                          : "#db9a45",
                      }}
                      onClick={handleSendOtp}
                    >
                      {isResendButtonDisabled
                        ? `${String(resendTimeout).padStart(2, "0")}s`
                        : "Gửi lại OTP"}
                    </button>
                  </div>
                  <div className="ml-[15px] mt-[3px]">
                    <span
                      name="error"
                      id="otp-error"
                      className="text-[13px] error text-red-600 text-start flex"
                    >
                      {" "}
                      {otpError}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-1/2 text-base p-[10px] mt-[1rem] bg-[#e3e3e3] text-[rgba(0,0,0,0.5)] border-none cursor-pointer rounded-xl transition-all duration-500 ease-in-out"
                  disabled={isVerifyOtpButtonEnabled}
                  style={{
                    backgroundColor: isVerifyOtpButtonEnabled
                      ? "#e3e3e3"
                      : "#db9a45",
                  }}
                  onClick={handleVerifyOtp}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeOtp;
