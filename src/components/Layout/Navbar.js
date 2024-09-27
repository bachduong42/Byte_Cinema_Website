import logo from "../../assets/images/logo.png"
import Image from "../Image/Image";
function Navbar() {
    return (
        <nav className="inline-flex">
            <div className="flex flex-col  items-start">
                <Image src={logo} alt={logo} width="75px" height="65px" />
                <div className="pixel-text text-[32px]  leading-5">Bytes</div>
                <div className="text-[#43CFFB]  text-xl playfair-text">Cinema</div>
            </div>
            <ul>
                <a href="#">Trang chủ</a>
                
            </ul>
        </nav>
    );
}

export default Navbar;