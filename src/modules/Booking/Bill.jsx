import img from "../../assets/images/emvatrinh.jpg"
function Bill({ listSeats, billSuccess }) {
    return (
        <div className={`flex flex-col bg-[#d9e9f0] ${billSuccess ? "w-full" : "lg:w-1/4 w-2/5"} min-h-[650px] rounded-md pt-2 gap-1`}>
            <span className="text-2xl mb-[15px] font-bold text-[#092b4b]">HÓA ĐƠN</span>
            <hr className="border-t-0 border-[#092b4b] border w-[80%] mx-auto" />
            <div className="w-full px-3 h-[200px] pt-2">
                <div className="w-full bg-white h-full px-4 py-4 flex gap-2">
                    <img src={img} alt="" className="w-[150px] h-full rounded-sm object-cover" />
                    <div className="flex flex-col px-1 gap-2 text-start" >
                        <h1 className="text-xl font-bold text-[#092b4b] ">
                            KẺ ẨN DANH
                        </h1>
                        <div className="w-[40px] h-[20px] bg-[#9E0000] rounded-sm text-[14px] items-center justify-center flex text-white font-bold">18+</div>
                        <div className="flex gap-3 items-center">
                            <span className="text-[16px] font-semibold">Thời lượng:</span>
                            <span className="text-[16px]">93 phút</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="text-[16px] font-semibold">Quốc gia:</span>
                            <span className="text-[16px]">Việt Nam</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-[16px] font-semibold ">Ngôn ngữ:</span>
                            <span className="text-[16px]">Tiếng Việt</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full h-auto min-h-[280px] px-5 pt-5 mt-5 gap-2 flex flex-col">
                    <div className="flex justify-between font-semibold">
                        <span>Thời gian:</span>
                        <span>25/9/2024</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Suất chiếu:</span>
                        <span>11:30</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Giá tiền 1 vé:</span>
                        <span className="text-[#008E28]">65.000đ</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Phòng chiếu:</span>
                        <span>B05</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Số ghế:</span>
                        <span>{listSeats.length}</span>
                    </div>
                    <div className="text-[#F75900] text-start">Ghế {listSeats.join(", ")}</div>
                    <div className="border-dashed  border-[#576f85] border"></div>
                    <div className="flex justify-between font-semibold">
                        <span>Tổng tiền:</span>
                        <span className="text-[#008E28]">130.000đ</span>
                    </div>

                </div>
                {billSuccess && <div className="mt-2 text-[#092B4B] italic">BYTES Cinema chúc bạn sẽ có trải nghiệm tuyệt vời tại rạp.
                    Cảm ơn vì đã lựa chọn chúng tôi !</div>}
            </div>

        </div>
    );
}

export default Bill;