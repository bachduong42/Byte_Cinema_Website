function ConfirmSeat() {
    return (
        <div className="flex flex-col w-full min-h-[300px]">
            <span className="text-xl mb-[15px] font-semibold text-[#092b4b] text-start">Xác nhận</span>
            <div className="w-[80%] border border-t-[#576f85] border-t-0 mx-auto my-2"></div>
            <div className="flex flex-col text-start text-[20px] gap-2 mt-5">
                <div> Đây là bộ phim yêu cầu độ tuổi trên<b> 18</b> tuổi.</div>
                <div> Bằng việc đồng ý với những quy định và điều khoản của BYTES Cinema, bạn hãy bấm xác nhận !</div>
                <div> Sau khi thanh toán, chúng tôi sẽ không chịu trách nhiệm và không hoàn trả số tiền bạn đã thanh toán dưới bất kì trường hợp nào vi phạm quy định !</div>
            </div>
        </div>
    );
}

export default ConfirmSeat;