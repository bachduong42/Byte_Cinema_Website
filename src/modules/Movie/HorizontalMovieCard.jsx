import Image from "../../components/Image/Image";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function HorizontalMovieCard({ infor, className, cardInfor = false }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${infor.id}`);
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
    return ''
  }

    function getGenres(genres) {
      if (genres) {
        return genres.map((genre) => genre.name).join(", ");
      }
      return ''
    }

  return (
    <div
      className={`relative group cursor-pointer bg-white m-[20px] mt-8 flex flex-col flex-1 overflow-hidden`}
      onClick={handleCardClick}
    >
      <div className="flex flex-row overflow-hidden">
        <div className="w-1/3 overflow-hidden">
          <Image
            src={infor.imagePaths[0]}
            alt={infor.imagePaths[0]}
            className=" h-full w-[100%] overflow-hidden object-cover"
          />
        </div>
        <div className="w-2/3 p-4 text-left justify-center items-center">
          <p className="text-2xl font-bold">{infor.name}</p>
          <div className="text-xl">
            {/* <p className="text-[#008e28]">{infor.type}</p> */}
            <p className="text-gray-600 py-2">
              <span className="font-bold">Thời lượng: </span>
              {`${convertDurationToMinutes(infor.duration)} phút`}
            </p>
            <p className="text-gray-600 py-2">
              <span className="font-bold">Quốc gia: </span>
              {infor.nation}
            </p>
            <p className="text-gray-600 py-2">
              <span className="font-bold">Thể loại: </span>
              {getGenres(infor.movieGenres)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
HorizontalMovieCard.protoTypes = {
  infor: PropTypes.object.isRequired,
  className: PropTypes.string,
  cardInfor: PropTypes.bool,
};
export default HorizontalMovieCard;
