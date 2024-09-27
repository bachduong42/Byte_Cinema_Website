import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import Image from "../Image/Image";
const Navbar = React.memo(() => {
    console.log("re-render")
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('/');
    useEffect(() => {
        setActiveButton(location.pathname);
    }, [location.pathname]);
    return (
        <nav className="flex justify-between lg:px-14 px-6 lg:h-[111px] md:h-[95px] h-[68px]">
            <div className="flex gap-x-14 items-center">
                <div className="flex flex-col items-start">
                    <Image src={logo} alt={logo} className="w-[40px] h-[30px] md:w-[50px] md:h-[45px] lg:w-[60px] lg:h-[55px]" />
                    <div className="pixel-text lg:text-[32px] md:text-[25px] text-base leading-5">Bytes</div>
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
                        href="/categories"
                        active={activeButton === '/categories'}
                        onClick={() => setActiveButton('/categories')}>
                        Thể loại
                    </Button>
                    <Button
                        href="/events"
                        active={activeButton === '/events'}
                        onClick={() => setActiveButton('/events')}>
                        Sự kiện
                    </Button>
                    <Button
                        href="/theaters"
                        active={activeButton === '/theaters'}
                        onClick={() => setActiveButton('/theaters')}>
                        Rạp/Giá vé
                    </Button>
                </ul>
            </div>
            <div className="flex gap-x-5 items-center">
                <Button text>Đăng nhập</Button>
                <Button primary>Đăng ký</Button>
            </div>
        </nav>
    );
})

export default Navbar;