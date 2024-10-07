import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import Image from "../Image/Image";
import Login from "../../modules/auth/Login";
import Register from "../../modules/auth/Register";
import ForgetPassword from "../../modules/auth/ForgetPassword";
import ChangePassword from "../../modules/auth/ChangePassword";
import ConfirmOtp from "../../modules/auth/ConfirmOtp";
const Navbar = React.memo(() => {
    console.log("re-render")
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false);

    const [loginModalRef, setLoginModalRef] = useState(null); 
    const [registerModalRef, setRegisterModalRef] = useState(null);
    const [forgetPasswordModalRef, setForgetPasswordModalRef] = useState(null);
    const [changePasswordModalRef, setChangePasswordModalRef] = useState(null);
    const [confirmOtpModalRef, setConfirmOtpModalRef] = useState(null);

    useEffect(() => {
        setActiveButton(location.pathname);
    }, [location.pathname]);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
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

      

      

      
    return (
        <nav className={`fixed top-0 left-0 right-0 flex z-50 justify-between lg:px-14 px-6 lg:h-[111px] md:h-[90px] h-[68px] transition-colors duration-300 ${isScrolled ? 'bg-[#092B4B] shadow-md border border-b-1 border-black' : ''}`}>
            <div className="flex gap-x-14 items-center">
                <div className="flex flex-col items-start">
                    <Image src={logo} alt={logo} className="w-[40px] h-[30px] md:w-[50px] md:h-[45px] lg:w-[60px] lg:h-[55px]" />
                    <div className="pixel-text lg:text-[32px] md:text-[25px] text-base leading-5 text-white">Bytes</div>
                    <div className="text-[#43CFFB]  lg:text-xl md:text-[18px] text-[12px] playfair-text">Cinema</div>
                </div>
                <ul className="lg:flex hidden gap-x-12 items-center">
                    <Button
                        href="/"
                        active={activeButton === '/'}
                        onClick={() => setActiveButton('/')}>
                        Trang chủ
                    </Button>
                    <Button
                        href="/"
                        active={activeButton === '/categories'}
                        onClick={() => setActiveButton('/categories')}>
                        Thể loại
                    </Button>
                    <Button
                        href="/"
                        active={activeButton === '/events'}
                        onClick={() => setActiveButton('/events')}>
                        Sự kiện
                    </Button>
                    <Button
                        href="/"
                        active={activeButton === '/theaters'}
                        onClick={() => setActiveButton('/theaters')}>
                        Rạp/Giá vé
                    </Button>
                </ul>
            </div>
            <div className="flex gap-x-5 items-center">
                <Button text onClick={handleLoginClick}>Đăng nhập</Button>
                <Button primary onClick={handleRegisterClick}>Đăng ký</Button>
            </div>

            <Login setModalRef={setLoginModalRef} openRegisterModal={handleRegisterClick} openForgetPasswordModal={handleForgetPasswordClick}/>
            <Register setModalRef={setRegisterModalRef} openLoginModal={handleLoginClick} openConfirmOtpModal={handleConfirmOtpClick}  />
            <ForgetPassword setModalRef={setForgetPasswordModalRef} openChangePasswordModal={handleChangePasswordClick}/>
            <ChangePassword setModalRef={setChangePasswordModalRef} openLoginModal={handleLoginClick} />
            <ConfirmOtp setModalRef={setConfirmOtpModalRef} openLoginModal={handleLoginClick}/>
        </nav>
    );
})

export default Navbar;