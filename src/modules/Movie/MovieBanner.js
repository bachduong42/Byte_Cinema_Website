import Image from "../../components/Image/Image";

function MovieBanner({ infor }) {
    return (
        <div className="w-full h-screen relative ">
            <Image src={infor.image} alt={infor.image} className="w-full h-screen object-cover" />
            <div className="absolute inset-0 bg-[#092B4B] opacity-80 z-40 flex flex-col justify-center items-start pl-[100px]">
                <div className="text-[#0DB1F6] text-[40px] font-extrabold nunito-text">{infor.type}</div>
                <div className="text-white text-[60px] anton-text">{infor.title}</div>
                <div className="text-white w-[400px] text-start nunito-text">{infor.description}</div>
            </div>

        </div>
    );
}

export default MovieBanner;