import { useNavigate } from "react-router-dom";
import Image from "../../components/Image/Image";

function MovieCommingSoon({ infor }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movie/${infor.id}`);
    };
    const formatReleaseDate = (releaseDay) => {
        const date = new Date(releaseDay);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <div className="w-full flex cursor-pointer gap-[100px]">
            <Image src={infor.imagePaths[1]} className="w-1/2 h-[456px] object-cover" onClick={handleCardClick}></Image>
            <div className="flex flex-col items-start gap-[20px]">
                <div className="text-[#0DB1F6] text-[20px] font-extrabold nunito-text">{infor.movieGenres[0].name}</div>
                <div className="text-white text-[40px] anton-text" onClick={handleCardClick}>{infor.name}</div>
                <div className="text-white w-[500px] text-start nunito-text text-[20px]">{infor.description}</div>
                <div className="flex gap-2">
                    <div className="anton-text text-[20px] text-[#FF3333]">SUẤT CHIẾU ĐẶC BIỆT:</div>
                    <div className="anton-text text-[20px] text-[#FF3333]">{formatReleaseDate(infor.releaseDay)}</div>
                </div>
            </div>
        </div>
    );
}

export default MovieCommingSoon;