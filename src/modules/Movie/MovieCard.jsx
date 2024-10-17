
import Image from "../../components/Image/Image";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
function MovieCard({ infor, className, cardInfor = false }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${infor.id}`);
  };

  return (
    <div
      className={`relative ${className} group cursor-pointer ${
        cardInfor
          ? "transition-transform duration-300 ease-in-out transform hover:scale-95"
          : ""
      }`}
      onClick={handleCardClick}
    >
      <Image
        src={infor.imagePaths[0]}
        alt=""
        className="w-full h-full object-cover  "
      />
      {cardInfor && (
        <div className="absolute flex flex-col items-center gap-2 bg-[#12739dcc] w-full bottom-0  h-2/5  opacity-0 transform  translate-y-1 group-hover:opacity-100 group-hover:translate-y-1 transition-transform duration-300 ease-in-out">
          <div className="text-[#FDB6B6] text-[14px] nunito-text font-extrabold pt-5">
            {infor.name}
          </div>
          <div className="flex gap-2 text-white text-[10px] nunito-text font-extrabold">
            <div>Thể loại:</div>
            <div>{infor.type}</div>
          </div>
          <div className="flex gap-2 text-white text-[10px] nunito-text font-extrabold">
            <div>Thời lượng:</div>
            <div>{infor.time}</div>
          </div>
          <button className="bg-[#FE9051] rounded-[5px] lg:w-[80px] lg:h-[30px] w-[80px] h-[25px] text-white text-[12px]">
            Mua vé
          </button>
        </div>
      )}
    </div>
  );
}
MovieCard.protoTypes = {
    infor: PropTypes.object.isRequired,
    className: PropTypes.string,
    cardInfor: PropTypes.bool,
}
export default MovieCard;
