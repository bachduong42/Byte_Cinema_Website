import Image from "../../components/Image/Image";

function MovieBanner({ infor = {} }) {
    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    return (
        <div className="w-full h-screen relative">
            <Image src={infor.imagePaths?.[1]} alt="" className="w-full h-screen object-cover" />
            <div className="absolute inset-0 bg-[#092B4B] opacity-80 z-40 flex flex-col justify-center items-start pl-[100px]">
                <div className="text-[#0DB1F6] text-[40px] font-extrabold nunito-text ">{infor.movieGenres[0]?.name}</div>
                <div className="text-white text-[60px] anton-text w-1/2 text-start">{infor.name}</div>
                <div className="text-white w-[400px] text-start nunito-text">{truncateDescription(infor.description, 200)}</div>
            </div>

        </div>
    );
}

export default MovieBanner;