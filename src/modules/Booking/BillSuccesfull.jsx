import { MdCheckCircle } from "react-icons/md";
import logo from "../../assets/images/logo.png"
import Image from "../../components/Image/Image";
import Bill from "./Bill";
function BillSuccessfull({ listSeats, billSuccess }) {
    return (
        <div className="flex flex-col w-full justify-center">
            <div className="flex gap-2 items-center justify-center">
                <MdCheckCircle className="text-[#008E28] text-[25px]" />
                <span className="text-[#008E28] font-semibold text-[25px]">ĐẶT VÉ THÀNH CÔNG</span>
            </div>
            <div className="w-full flex justify-center">
                <div className="w-[30%] h-[800px] flex flex-col">
                    <div className="flex w-full h-[130px] justify-between bg-[#092B4B] py-3 px-2">
                        <div className="flex flex-col items-start ">
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
                        <div className="flex flex-col text-end">
                            <span className="text-[25px] text-white font-bold">VÉ XEM PHIM</span>
                            <div className="w-[80%] border border-t-[#576f85] border-t-0 mx-auto my-2"></div>
                            <div className="justify-end text-white text-end flex">Đặt lúc: 12:00 , 22/09/2024</div>
                            <div className="text-white text-end flex">Người đặt: Nguyễn Trần Thu Phương</div>
                        </div>
                    </div>
                    <div className="w-full h-[370px]">
                        <Bill listSeats={listSeats} billSuccess={billSuccess}></Bill>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillSuccessfull;