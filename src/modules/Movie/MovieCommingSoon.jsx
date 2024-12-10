import { useNavigate } from "react-router-dom";
import Image from "../../components/Image/Image";

function MovieCommingSoon({ infor }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        console.log('hello');
        navigate(`/movie/${infor.id}`);
    };
    const formatReleaseDate = (releaseDay) => {
        const date = new Date(releaseDay);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="w-full flex cursor-pointer gap-[70px]">
            <Image
                onClick={handleCardClick}
                src={infor.imagePaths?.[1]} alt={infor.imagePaths?.[1]} className="w-1/2 h-[456px] object-cover" ></Image>
            <div className="flex flex-col items-start gap-[15px]">
                <div className="text-[#0DB1F6] text-[20px] font-extrabold nunito-text">{infor.movieGenres[0].name}</div>
                <div className="text-white text-[40px] anton-text text-start" onClick={handleCardClick}>{infor.name}</div>
                <div className="text-white w-[500px] text-start nunito-text text-[20px]">{truncateDescription(infor.description, 400)}</div>
                <div className="flex gap-2">
                    <div className="anton-text text-[20px] text-[#FF3333]">SUẤT CHIẾU ĐẶC BIỆT:</div>
                    <div className="anton-text text-[20px] text-[#FF3333]">{formatReleaseDate(infor.releaseDay)}</div>
                </div>
            </div>
        </div>
    );
}

export default MovieCommingSoon;