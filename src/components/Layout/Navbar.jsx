import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../Image/Image";
import Login from "../../modules/auth/Login";
import Register from "../../modules/auth/Register";
import ForgetPassword from "../../modules/auth/ForgetPassword";
import ChangePassword from "../../modules/auth/ChangePassword";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import noImage from "../../assets/images/hy.jpg"
import ConfirmOtp from "../../modules/auth/ConfirmOtp";
import Tippy from '@tippyjs/react/headless';
import { MdLogin, MdOutlinePerson, MdOutlineSettings } from "react-icons/md";
const Navbar = React.memo(() => {
    console.log("re-render")
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false);
    const isLogin = localStorage.getItem('isLogin')
    const [loginModalRef, setLoginModalRef] = useState(null);
    const [registerModalRef, setRegisterModalRef] = useState(null);
    const [forgetPasswordModalRef, setForgetPasswordModalRef] = useState(null);
    const [changePasswordModalRef, setChangePasswordModalRef] = useState(null);
    const [confirmOtpModalRef, setConfirmOtpModalRef] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    useEffect(() => {
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
    }

    const handleChangePasswordClick = () => {
        if (changePasswordModalRef) {
            changePasswordModalRef.openChangePasswordModal();
        }
    }

    const handleConfirmOtpClick = () => {
        if (confirmOtpModalRef) {
            confirmOtpModalRef.openConfirmOtpModal();
        }
    }

    const handleHideResult = () => {
        setShowMenu(false)
    }
    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const isHome = location.pathname === '/';


    return (
        <nav className={`fixed top-0 left-0 right-0 flex z-50 justify-between lg:px-14 px-6 lg:h-[111px] md:h-[90px] h-[68px] transition-colors duration-300  ${!isHome ? 'bg-[#092B4B]' : (isScrolled ? 'bg-[#092B4B] shadow-md border border-b-1 border-black' : '')}`}>
            <div className="flex gap-x-14 items-center">
                <div className="flex flex-col items-start">
                    <Image src={logo} alt={logo} className="w-[40px] h-[30px] md:w-[50px] md:h-[45px] lg:w-[60px] lg:h-[55px]" />
                    <div className="pixel-text lg:text-[32px] md:text-[25px] text-base leading-5 text-white">Bytes</div>
                    <div className="text-[#43CFFB]  lg:text-xl md:text-[18px] text-[12px] playfair-text">Cinema</div>
                </div>
                <ul className="lg:flex hidden gap-x-12 items-center">
                    {isLogin && isAdmin ? (
                        <>
                            <Button
                                href="/film-management"
                                active={activeButton === '/film-management'}
                                className="lg:text-xl md:text-base"
                                onClick={() => setActiveButton('/film-management')}>
                                Quản lý phim
                            </Button>
                            <Button
                                href="/"
                                active={activeButton === '/showtime-management'}
                                className="lg:text-xl md:text-base"
                                onClick={() => setActiveButton('/showtime-management')}>
                                Quản lý lịch chiếu
                            </Button>
                            <Button
                                href="/"
                                active={activeButton === '/theater-management'}
                                className="lg:text-xl md:text-base"
                                onClick={() => setActiveButton('/theater-management')}>
                                Quản lý phòng
                            </Button>

                        </>) : (
                        <>
                            <Button
                                href="/"
                                className="lg:text-xl md:text-base"
                                active={activeButton === '/'}
                                onClick={() => setActiveButton('/')}>
                                Trang chủ
                            </Button>
                            <Button
                                href="/"
                                active={activeButton === '/categories'}
                                className="lg:text-xl md:text-base"
                                onClick={() => setActiveButton('/categories')}>
                                Thể loại
                            </Button>
                            <Button
                                href="/"
                                className="lg:text-xl md:text-base"
                                active={activeButton === '/events'}
                                onClick={() => setActiveButton('/events')}>
                                Sự kiện
                            </Button>
                            <Button
                                href="/"
                                className="lg:text-xl md:text-base"
                                active={activeButton === '/theaters'}
                                onClick={() => setActiveButton('/theaters')}>
                                Rạp/Giá vé
                            </Button>
                        </>
                    )}

                </ul>
            </div>
            {
                isLogin ? (
                    <Tippy
                        onClickOutside={handleHideResult}
                        visible={showMenu}
                        interactive
                        placement="bottom-end"
                        render={attrs => (
                            <div className="w-[200px] items-start flex" tabIndex="-1" {...attrs}>
                                <div className="w-full min-h-[100px] rounded-lg shadow-xl bg-white mt-[-20px] py-2 flex-col flex gap-1">
                                    <div className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer ">
                                        <MdOutlinePerson className=" text-[25px]" />
                                        <span className="nunito-text">Trang cá nhân</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer ">
                                        <MdOutlineSettings className=" text-[25px]" />
                                        <span className="nunito-text">Cài đặt</span>
                                    </div>
                                    <div
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer">
                                        <MdLogin className=" text-[25px]" />
                                        <span className="nunito-text">Đăng xuất</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <div
                            onMouseEnter={() => {
                                setShowMenu(true)
                            }}
                            className="flex  items-center">
                            <img src={noImage} alt="" className="w-[60px] h-[60px] rounded-[90px] cursor-pointer" />
                        </div>
                    </Tippy >
                ) : (
                    <div className="flex gap-x-5 items-center">
                        <Button text onClick={handleLoginClick}>Đăng nhập</Button>
                        <Button primary onClick={handleRegisterClick}>Đăng ký</Button>
                    </div>
                )
            }
            <Login setModalRef={setLoginModalRef} openRegisterModal={handleRegisterClick} openForgetPasswordModal={handleForgetPasswordClick} />
            <Register setModalRef={setRegisterModalRef} openLoginModal={handleLoginClick} openConfirmOtpModal={handleConfirmOtpClick} />
            <ForgetPassword setModalRef={setForgetPasswordModalRef} openChangePasswordModal={handleChangePasswordClick} />
            {/* <ChangePassword setModalRef={setChangePasswordModalRef} openLoginModal={handleLoginClick} /> */}
            <ConfirmOtp setModalRef={setConfirmOtpModalRef} openLoginModal={handleLoginClick} />
        </nav >
    );
})

export default Navbar;