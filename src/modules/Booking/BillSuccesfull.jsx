import { MdCheckCircle } from "react-icons/md";
import logo from "../../assets/images/logo.png"
import Image from "../../components/Image/Image";
import Bill from "./Bill";
import { useState } from "react";
function BillSuccessfull() {
    const [listSeats, setListSeats] = useState(["C2", " C4"]);
    return (
        <div className="flex flex-col w-full justify-center  mt-[115px]  lg:px-16 pt-5 pb-10 ">
            <div className="text-3xl mb-[15px] font-bold text-[#092b4b] text-start">Đặt vé</div>
            <div className="w-full justify-center items-center flex flex-col gap-2">
                <div className="w-[80%] h-[15px] border border-gray rounded-[23px] bg-[#ced5db] text-center flex">
                    <div className="w-1/4 h-full bg-[#284662] rounded-s-3xl"></div>
                    <div className={`w-1/4 h-full bg-[#284662]`}></div>
                    <div className={`w-1/4 h-full  bg-[#284662]`}></div>
                    <div className={`w-1/4 h-full bg-[#284662]`}></div>
                </div>
                <div className="w-[80%] h-[15px]  text-center flex">
                    <div className="w-1/4 h-full font-bold text-[18px] text-[#092b4b]">Chọn suất</div>
                    <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">Chọn ghế</div>
                    <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">Xác nhận</div>
                    <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">Thanh toán</div>
                </div>
            </div>
            <div className="flex gap-2 items-center justify-center mt-5">
                <MdCheckCircle className="text-[#008E28] text-[30px]" />
                <span className="text-[#008E28] font-semibold text-[30px]">ĐẶT VÉ THÀNH CÔNG</span>
            </div>
            <div className="w-full flex justify-center mt-5">
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
                        <Bill listSeats={listSeats} billSuccess={true}></Bill>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillSuccessfull;