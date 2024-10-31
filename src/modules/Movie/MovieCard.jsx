
import Image from "../../components/Image/Image";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import Button from "../../components/Button/Button";
function MovieCard({
  infor,
  className,
  cardInfor = false,
  admin = false,
  happening = false,
  type,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (type === "schedule") {
      navigate(`/schedule-movie/${infor.id}`)
    } else if (type == "update") {
      // handleUpdate();
    } else {
      // navigate(`/movie/${infor.id}`);
    }
  };

  function convertDurationToMinutes(duration) {
    if (duration) {
      const hours = duration.match(/(\d+)H/);
      const minutes = duration.match(/(\d+)M/);

      const totalMinutes =
        (hours ? parseInt(hours[1]) * 60 : 0) +
        (minutes ? parseInt(minutes[1]) : 0);
      return totalMinutes;
    }
    return "";
  }
  const handleUpdate = () => {
    navigate(`/update-movie/${infor.id}`)
  }
  const handleViewDetail = () => {
    navigate(`/movie/${infor.id}`)
  }

  return (
    <div
      className={`relative min-w-[200px] ${className} group cursor-pointer ${cardInfor
        ? "transition-transform duration-300 ease-in-out transform hover:scale-95"
        : ""
        }`}
      onClick={handleCardClick}
    >
      <Image

        src={infor.imagePaths[0]}
        alt=""
        className="w-full h-full object-cover"
      />
      {cardInfor && (
        <div className="absolute flex flex-col items-center gap-2 bg-[#12739dcc] w-full bottom-0  h-2/5  opacity-0 transform  translate-y-1 group-hover:opacity-100 group-hover:translate-y-1 transition-transform duration-300 ease-in-out">
          <div className="text-[#FDB6B6] text-[14px] nunito-text font-extrabold pt-5">
            {infor.name}
          </div>
          {admin ? (
            <>
              {happening ? (
                <div className="text-[#FE9051] font-semibold">ĐANG CHIẾU</div>
              ) : (
                <div className="text-[#FE9051] font-semibold">SẮP CHIẾU</div>
              )}
            </>
          ) : (
            <>
              <div className="flex gap-2 text-white text-[10px] nunito-text font-extrabold">
                <div>Thể loại:</div>
                <div>{infor.movieGenres[0].name}</div>
              </div>
              <div className="flex gap-2 text-white text-[10px] nunito-text font-extrabold">
                <div>Thời lượng:</div>
                <div> {`${convertDurationToMinutes(infor.duration)} phút`}</div>
              </div>
            </>
          )}
          {admin ? (
            <div className="flex gap-2">
              <button
                onClick={handleViewDetail} text className="text-white text-[14px]">
                Xem chi tiết
              </button>
              {type === "update" && (
                <button className="bg-[#008E28] rounded-[5px] lg:w-[80px] lg:h-[30px] w-[80px] h-[25px] text-white text-[12px]"
                  onClick={handleUpdate}>
                  Chỉnh sửa
                </button>
              )}
            </div>
          ) : (
            <button className="bg-[rgb(254,144,81)] rounded-[5px] lg:w-[80px] lg:h-[30px] w-[80px] h-[25px] text-white text-[12px]">
              Mua vé
            </button>
          )}
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
