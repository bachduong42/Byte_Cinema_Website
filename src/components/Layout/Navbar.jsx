import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "../Image/Image";
import Login from "../../modules/auth/Login";
import Register from "../../modules/auth/Register";
import ForgetPassword from "../../modules/auth/ForgetPassword";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import noImage from "../../assets/images/hy.jpg";
import ConfirmOtp from "../../modules/auth/ConfirmOtp";
import Tippy from "@tippyjs/react/headless";
import { MdLogin, MdOutlinePerson, MdOutlineSettings, MdPassword, MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import ModalEditProfile from "../Modal/ModalEditProfile"
import ModalChangePassword from "../Modal/ModalChangePassword";
import { getUser } from "../../services/login";
import { Modal } from "antd";
import { config } from "@fortawesome/fontawesome-svg-core";
const Navbar = React.memo(() => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);
  const isLogin = localStorage.getItem("isLogin");
  // const isAdmin = localStorage.getItem("isAdmin");
  const [loginModalRef, setLoginModalRef] = useState(null);
  const [registerModalRef, setRegisterModalRef] = useState(null);
  const [forgetPasswordModalRef, setForgetPasswordModalRef] = useState(null);
  const [changePasswordModalRef, setChangePasswordModalRef] = useState(null);
  const [confirmOtpModalRef, setConfirmOtpModalRef] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const [modalChangePassword, setModalChangePassword] = useState(false);
  // const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [profile, setProfile] = useState(user);

  // const [isAdmin, setIsAdmin] = useState(false);
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

  useEffect(() => {
    // console.log("navbar", user);
    setActiveButton(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    if (loginModalRef) {
      loginModalRef.openLoginModal();
    }
  };

  const handleRegisterClick = () => {
    if (registerModalRef) {
      registerModalRef.openRegisterModal();
    }
  };

  const handleForgetPasswordClick = () => {
    if (forgetPasswordModalRef) {
      forgetPasswordModalRef.openForgetPasswordModal();
    }
  };

  const handleChangePasswordClick = () => {
    if (changePasswordModalRef) {
      changePasswordModalRef.openChangePasswordModal();
    }
  };

  const handleConfirmOtpClick = () => {
    if (confirmOtpModalRef) {
      confirmOtpModalRef.openConfirmOtpModal();
    }
  };
  const handleOpenModalProfile = () => {
    setProfileModal(true);
  }
  const handleOpenModalChangePassword = () => {
    setModalChangePassword(true);
  }

  const handleHideResult = () => {
    setShowMenu(false);
  };
  const handleLogout = () => {
    setIsModalOpen(true)
  };

  const handleViewTransactions = () => {
    if (isLogin) {
      navigate(`/transactions`);
      setActiveButton("/transactions");
    } else {
      toast.info("Vui lòng đăng nhập để đặt vé!", {
        autoClose: 1000,
        position: "top-center",
      });
    }
    // navigate(`/transactions`);
    // setActiveButton("/transactions");
  };

  const isHome = location.pathname === "/";
  const fetchUser = async () => {
    const res = await getUser();
    setProfile(res.data.user);
  }
  const handleUpdateProfile = async () => {
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    logout();
    navigate("/");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex z-50 justify-between lg:px-14 px-6 lg:h-[111px] md:h-[90px] h-[68px] transition-colors duration-300  ${!isHome
        ? "bg-[#092B4B]"
        : isScrolled
          ? "bg-[#092B4B] shadow-md border border-b-1 border-black"
          : ""
        }`}
    >
      <Modal
        title={
          <span className="text-2xl text-[#092b4b] font-bold">
            Xác nhận đăng xuất
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Thoát"
        centered
        className="custom-modal"
      >
        <p className="text-[15px]">Bạn chắc chắn muốn đăng xuất tài khoản?</p>
      </Modal>
      <div className="flex gap-x-14 items-center">
       <Link to={user?.role === "ADMIN"?'/film-management':'/'}>
          <div className="flex flex-col items-start">
            <Image
              src={logo}
              alt={logo}
              className="w-[40px] h-[30px] md:w-[50px] md:h-[45px] lg:w-[60px] lg:h-[55px]"
            />
            <div className="pixel-text lg:text-[32px] md:text-[25px] text-base leading-5 text-white">
              Bytes
            </div>
            <div className="text-[#43CFFB]  lg:text-xl md:text-[18px] text-[12px] playfair-text">
              Cinema
            </div>
          </div>
       </Link>
        <ul className="lg:flex hidden gap-x-12 items-center">
          {isLogin && isAdmin ? (
            <>
              <Button
                href="/film-management"
                active={activeButton === "/film-management"}
                className="lg:text-xl md:text-base"
                onClick={() => setActiveButton("/film-management")}
              >
                Quản lý phim
              </Button>
              <Button
                href={`/manage-schedules`}
                active={activeButton === "/manage-schedules"}
                className="lg:text-xl md:text-base"
                onClick={() => setActiveButton("/manage-schedules")}
              >
                Quản lý lịch chiếu
              </Button>
              <Button
                href="/manage-auditorium"
                active={activeButton === "/manage-auditorium"}
                className="lg:text-xl md:text-base"
                onClick={() => setActiveButton("/manage-auditorium")}
              >
                Quản lý phòng
              </Button>
              <Button
                href="/report-revenue"
                active={activeButton === "/report-revenue"}
                className="lg:text-xl md:text-base"
                onClick={() => setActiveButton("/report-revenue")}
              >
                Thống kê
              </Button>
            </>
          ) : (
            <>
              <Button
                href="/"
                className="lg:text-xl md:text-base"
                active={activeButton === "/"}
                onClick={() => setActiveButton("/")}
              >
                Trang chủ
              </Button>
              <Button
                to="/categories"
                active={activeButton === "/categories"}
                className="lg:text-xl md:text-base"
                onClick={() => setActiveButton("/categories")}
              >
                Thể loại
              </Button>
              <Button
                href="/"
                className="lg:text-xl md:text-base"
                active={activeButton === "/events"}
                onClick={() => setActiveButton("/events")}
              >
                Sự kiện
              </Button>
              <Button
                href="/"
                className="lg:text-xl md:text-base"
                active={activeButton === "/theaters"}
                onClick={() => setActiveButton("/theaters")}
              >
                Rạp/Giá vé
              </Button>
              {/* <Button
                // href="/transactions"
                className="lg:text-xl md:text-base"
                active={activeButton === "/transactions"}
                onClick={handleViewTransactions}
              >
                Giao dịch
              </Button> */}
            </>
          )}
        </ul>
      </div>
      {isLogin ? (
        <Tippy
          onClickOutside={handleHideResult}
          visible={showMenu}
          interactive
          placement="bottom-end"
          render={(attrs) => (
            <div
              className="w-[200px] items-start flex"
              tabIndex="-1"
              {...attrs}
            >
              <div className="w-full min-h-[100px] rounded-lg shadow-xl bg-white mt-[-20px] py-2 flex-col flex gap-1">
                <div
                  onClick={() => {
                    handleOpenModalProfile();
                    handleHideResult();
                  }}
                  className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer "
                >
                  <MdOutlinePerson className=" text-[25px]" />
                  <span className="nunito-text">Thông tin cá nhân</span>
                </div>
                <div
                  onClick={() => {
                    handleOpenModalChangePassword();
                    handleHideResult();
                  }}
                  className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer "
                >
                  <MdPassword className=" text-[25px]" />
                  <span className="nunito-text">Đổi mật khẩu</span>
                </div>
                {!isAdmin && (
                  <div
                    onClick={handleViewTransactions}
                    className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer "
                  >
                    <MdShoppingCart className=" text-[25px]" />
                    <span className="nunito-text">Đơn hàng của tôi</span>
                  </div>
                )}
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer"
                >
                  <MdLogin className=" text-[25px]" />
                  <span className="nunito-text">Đăng xuất</span>
                </div>
              </div>
            </div>
          )}
        >
          <div className="flex  items-center">
            <img
              // onClick={() => { handleHideResult(); }}
              onMouseEnter={() => {
                setShowMenu((prev) => !prev);
              }}
              src={profile?.avatar || noImage}
              alt=""
              className="w-[50px] h-[50px] rounded-[90px] cursor-pointer"
            />
          </div>
        </Tippy>
      ) : (
        <div className="flex gap-x-5 items-center">
          <Button text onClick={handleLoginClick}>
            Đăng nhập
          </Button>
          <Button primary onClick={handleRegisterClick}>
            Đăng ký
          </Button>
        </div>
      )}
      <Login
        setModalRef={setLoginModalRef}
        openRegisterModal={handleRegisterClick}
        openForgetPasswordModal={handleForgetPasswordClick}
      />
      <Register
        setModalRef={setRegisterModalRef}
        openLoginModal={handleLoginClick}
        openConfirmOtpModal={handleConfirmOtpClick}
      />
      <ForgetPassword
        setModalRef={setForgetPasswordModalRef}
        openChangePasswordModal={handleChangePasswordClick}
      />
      {/* <ChangePassword setModalRef={setChangePasswordModalRef} openLoginModal={handleLoginClick} /> */}
      <ConfirmOtp
        setModalRef={setConfirmOtpModalRef}
        openLoginModal={handleLoginClick}
      />
      {profileModal && (
        <ModalEditProfile
          onProfileUpdate={handleUpdateProfile}
          handleClose={() => setProfileModal(false)}
        ></ModalEditProfile>
      )}
      {modalChangePassword && (
        <ModalChangePassword
          handleClose={() => setModalChangePassword(false)}
        ></ModalChangePassword>
      )}
    </nav>
  );
});

export default Navbar;
