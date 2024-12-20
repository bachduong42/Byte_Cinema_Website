
import Image from "../../components/Image/Image";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function MovieCard({
  infor = {},
  className,
  cardInfor = false,
  admin = false,
  happening = false,
  type,
  onDelete,
}) {
  // console.log(infor);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin");
  // const [openLogin, setOpenLogin] = useState(false);
  const handleCardClick = () => {
    if (type === "schedule") {
      navigate(`/schedule-movie/${infor.id}`);
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
    navigate(`/update-movie/${infor.id}`);
  };
  const handleViewDetail = () => {
    navigate(`/movie/${infor.id}`);
  };

  const handleBookingClick = () => {
    if (isLogin) {
      navigate(`/book-movie-ticket/${infor.id}`);
    } else {
      toast.info("Vui lòng đăng nhập để đặt vé!", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };
  const handleDeleteFilm = () => {
    onDelete();
  };

  return (
    <div
      className={`relative min-w-[200px] ${className} group cursor-pointer ${cardInfor
        ? "transition-transform duration-300 ease-in-out transform hover:scale-95"
        : ""
        }`}
      onClick={handleCardClick}
    >
      <Image
        src={infor.imagePaths?.[0]}
        alt=""
        className="w-full h-full object-cover"
      />
      {cardInfor && (
        <div className="absolute flex flex-col items-center gap-2 bg-[#12739dcc] w-full bottom-0  h-3/5  opacity-0 transform  translate-y-1 group-hover:opacity-100 group-hover:translate-y-1 transition-transform duration-300 ease-in-out">
          <div
            className="text-[#FDB6B6] text-[14px] nunito-text font-extrabold pt-5"
            onClick={handleViewDetail}
          >
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
                <div>{infor.movieGenres[0]?.name}</div>
              </div>
              <div className="flex gap-2 text-white text-[10px] nunito-text font-extrabold">
                <div>Thời lượng:</div>
                <div> {`${convertDurationToMinutes(infor.duration)} phút`}</div>
              </div>
            </>
          )}
          {admin ? (
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <button
                  onClick={handleViewDetail}
                  className="text-white text-[13px]"
                >
                  Xem chi tiết
                </button>
                {type === "update" && (
                  <button
                    className="bg-[#008E28] rounded-[5px] px-3 h-[25px] text-white text-[12px]"
                    onClick={handleUpdate}
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
              {type === "update" && (
                <div className="flex justify-center">
                  <button
                    onClick={handleDeleteFilm}
                    className="bg-[#9E0000] rounded-[5px] px-3 h-[25px] text-white text-[12px]"
                  >
                    Xoá
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <button onClick={handleViewDetail}
                className="text-white text-[12px]">Xem chi tiết</button>
              <button
                onClick={handleBookingClick}
                className="bg-[rgb(254,144,81)] rounded-[5px] lg:w-[80px] lg:h-[30px] w-[80px] h-[25px] text-white text-[12px]"
              >
                Mua vé
              </button>
            </div>
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