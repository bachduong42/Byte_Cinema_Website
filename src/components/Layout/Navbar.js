import logo from "../../assets/images/logo.png"
import Image from "../Image/Image";
function Navbar() {
    return (
        <nav className="flex justify-between">
            <div className="flex gap-x-5">
                <div className="flex flex-col items-start">
                    <Image src={logo} alt={logo} width="75px" height="65px" />
                    <div className="pixel-text text-[32px]  leading-5">Bytes</div>
                    <div className="text-[#43CFFB]  text-xl playfair-text">Cinema</div>
                </div>
                <ul className="flex gap-x-5">
                    <a href="/" >Trang chủ</a>
                    <a href="/" >Thể loại</a>
                    <a href="/" >Sự kiện</a>
                    <a href="/" >Rạp/Giá vé</a>
                </ul>
            </div>
            <div className="flex gap-x-5">
                <button></button>
            </div>
        </nav>
    );
}

export default Navbar;