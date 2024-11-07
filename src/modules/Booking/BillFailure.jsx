import { MdCancel, MdCheckCircle } from "react-icons/md";

import logo from "../../assets/images/logo.png"
import Image from "../../components/Image/Image";
function BillFailure() {
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
            <div className="flex gap-2 items-center justify-center mt-20">
                <MdCancel className="text-[#9E0000] text-[30px]" />
                <span className="text-[#9E0000] font-semibold text-[30px]">ĐẶT VÉ KHÔNG THÀNH CÔNG</span>
            </div>
            <div className="w-full flex justify-center mt-5">
                <div className="w-[50%] h-[800px] flex flex-col items-center">
                    <div className="flex w-[150px] h-[150px] bg-[#092B4B] py-3 px-2  rounded-full">
                        <div className="flex flex-col justify-center items-center mx-auto ">
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

                    </div>
                    <div className="text-[25px] justify-start flex flex-col gap-3 text-start mt-5">
                        <div>Trường hợp giao dịch chưa thành công, quý khách vui lòng không thực hiện giao dịch online lần nữa và tới rạp BYTES Cinema để mua vé.</div>

                        <div>Chúng tôi cam kết sẽ hoàn lại 100% giá trị giao dịch lỗi đã bị trừ tiền sau khi đội ngũ CSKH kiểm tra và xác nhận.</div>

                        <div>Nếu có thắc mắc vui lòng liên hệ với chúng tôi qua Hotline:<b> 003.064.1546.</b></div>
                    </div>
                    <div className="w-full text-end flex text-[30px] font-bold mt-10 justify-end">BYTES Cinema.</div>

                </div>
            </div>
        </div>
    );
}

export default BillFailure;