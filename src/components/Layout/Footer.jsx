import logo from "../../assets/images/logo.png"
import Image from "../Image/Image";
function Footer() {
    return (
        <div className="bg-[#092B4B] ">
            <hr className="border-t-0 border-[#0DB1F6] border w-full" />
            <div className="flex justify-around mt-[50px]">
                <div className="flex flex-col items-start justify-center">
                    <Image src={logo} alt={logo} className="w-[40px] h-[30px] md:w-[50px] md:h-[45px] lg:w-[60px] lg:h-[55px]" />
                    <div className="pixel-text lg:text-[32px] md:text-[25px] text-base leading-5 text-white">Bytes</div>
                    <div className="text-[#43CFFB]  lg:text-xl md:text-[18px] text-[12px] playfair-text">Cinema</div>
                </div>
                <div className="flex flex-col items-start gap-3">
                    <div className="nunito-text text-white text-[24px] font-semibold">Về TripJoy</div>
                    <div className="nunito-text text-white text-[20px]">Lên kế hoạch </div>
                    <div className="nunito-text text-white text-[20px]">Chia sẻ hành trình</div>
                    <div className="nunito-text text-white text-[20px]">Theo dõi thành viên</div>
                </div>
                <div className="flex flex-col items-start gap-3">
                    <div className="nunito-text text-white text-[24px] font-semibold">Sản phẩm</div>
                    <div className="nunito-text text-white text-[20px] ">Lên kế hoạch </div>
                    <div className="nunito-text text-white text-[20px] ">Chia sẻ hành trình</div>
                    <div className="nunito-text text-white text-[20px] ">Theo dõi thành viên</div>
                </div>
                <div className="flex flex-col items-start gap-3">
                    <div className="nunito-text text-white text-[24px] font-semibold">Tài nguyên</div>
                    <div className="nunito-text text-white text-[20px] ">Lên kế hoạch </div>
                    <div className="nunito-text text-white text-[20px] ">Chia sẻ hành trình</div>
                    <div className="nunito-text text-white text-[20px] ">Theo dõi thành viên</div>
                </div>
            </div>
            <hr className="border-t-0 border-[#AEAEAE] border mt-[50px] w-[80%] mx-auto" />
            <div className="w-[80%] mx-auto py-[40px] flex justify-between">
                <div className="nunito-text text-[18px] font-normal text-[#797979]">© Copyright 2024 TripJoy. Dilys All rights reserved.</div>
                <div className="flex gap-[40px]">
                    <div className="nunito-text text-white text-[18px] ">Terms & conditions</div>
                    <div className="nunito-text text-white text-[18px] ">Privacy</div>
                    <div className="nunito-text text-white text-[18px] ">Disclaimer</div>
                </div>
            </div>
        </div>);
}

export default Footer