
import { useState } from "react";
import Button from "../components/Button/Button";
import Bill from "../modules/Booking/Bill";
import SelectSeat from "../modules/Booking/SelectSeat";
import ConfirmSeat from "../modules/Booking/ConfirmSeat";
// import BillSuccessfull from "../modules/Booking/BillSuccesfull";
function BookTicket() {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const seatsPerRow = 10;
    const [currentStep, setCurrentStep] = useState(1);
    const [slideDirection, setSlideDirection] = useState('');
    const [listSeats, setListSeats] = useState([]);
    const handleNextPage = () => {
        setSlideDirection('next');
        setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
            console.log("next");
        }, 300);
    }
    const handleBackPage = () => {
        setSlideDirection('prev');
        setTimeout(() => {
            setCurrentStep((prev) => prev - 1);
        }, 300);
    }


    return (
        <div className="min-h-[800px] h-auto flex flex-col mt-[115px] justify-start w-full lg:px-16 pt-5 pb-10">
            <div className="text-3xl mb-[15px] font-bold text-[#092b4b] text-start">Đặt vé</div>
            <div className="w-full justify-center items-center flex flex-col gap-2">
                <div className="w-[80%] h-[15px] border border-gray rounded-[23px] bg-[#ced5db] text-center flex">
                    <div className="w-1/4 h-full bg-[#284662] rounded-s-3xl"></div>
                    <div className={`w-1/4 h-full ${currentStep === 2 || currentStep === 4 || currentStep === 3 ? "bg-[#284662]" : "bg-[#576f85]"}`}></div>
                    <div className={`w-1/4 h-full ${currentStep === 2 ? "bg-[#576f85]" : ""} ${currentStep === 4 || currentStep === 3 ? "bg-[#284662]" : ""}`}></div>
                    <div className={`w-1/4 h-full ${currentStep === 4 ? "bg-[#284662]" : ""} ${currentStep === 3 ? "bg-[#576f85]" : ""}`}></div>
                </div>
                <div className="w-[80%] h-[15px]  text-center flex">
                    <div className="w-1/4 h-full font-bold text-[18px] text-[#092b4b]">Chọn suất</div>
                    <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">Chọn ghế</div>
                    <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">Xác nhận</div>
                    <div className="w-1/4 h-full font-semibold text-[18px] text-[#092b4b]">Thanh toán</div>
                </div>
            </div>
            <div className="flex flex-row gap-5 w-full h-full mt-10">
                <div className={`flex flex-col px-10 ${currentStep === 4 ? "w-full" : "lg:w-3/4 w-3/5 "}`}>
                    {currentStep === 1 && <SelectSeat rows={rows} seatsPerRow={seatsPerRow} listSeats={listSeats} setListSeats={setListSeats}></SelectSeat>}
                    {currentStep == 2 && <ConfirmSeat></ConfirmSeat>}
                    {/* {currentStep == 4 && <BillSuccessfull listSeats={listSeats} billSuccess></BillSuccessfull>} */}
                    <div className="w-[80%] border border-t-[#576f85] border-t-0 mx-auto my-2"></div>

                    <div className="flex gap-16 pt-3 justify-center mt-5">
                        <button
                            onClick={handleBackPage}
                            className="bg-white text-base rounded-[5px] text-black border-[#092b4b] border md:w-[120px] md:h-[35px] ">Quay lại</button>
                        <Button
                            disabled={listSeats.length === 0}
                            onClick={handleNextPage}
                            className={`bg-[#092b4b] rounded-[5px]  md:w-[120px] md:h-[35px] w-[80px] h-[25px] text-white ${listSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                            {currentStep === 1 ? "Tiếp theo" : "Xác nhận"}</Button>
                    </div>
                </div>
                <Bill listSeats={listSeats}></Bill>

            </div>
        </div>
    );
}

export default BookTicket;