import Image from "../../components/Image/Image";

function MovieCommingSoon({ infor }) {
    return (
        <div className="w-full flex cursor-pointer gap-[100px]">
            <Image src={infor.image} className="w-1/2 h-[456px] object-cover"></Image>
            <div className="flex flex-col items-start gap-[20px]">
                <div className="text-[#0DB1F6] text-[20px] font-extrabold nunito-text">{infor.type}</div>
                <div className="text-white text-[40px] anton-text">{infor.title}</div>
                <div className="text-white w-[500px] text-start nunito-text text-[20px]">{infor.description}</div>
                <div className="flex gap-2">
                    <div className="anton-text text-[20px] text-[#FF3333]">SUẤT CHIẾU ĐẶC BIỆT:</div>
                    <div className="anton-text text-[20px] text-[#FF3333]">{infor.date}</div>
                </div>
            </div>
        </div>
    );
}

export default MovieCommingSoon;