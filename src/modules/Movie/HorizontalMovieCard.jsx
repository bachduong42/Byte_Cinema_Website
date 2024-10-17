import Image from "../../components/Image/Image";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function HorizontalMovieCard({ infor, className, cardInfor = false }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${infor.id}`);
  };

  return (
    <div
      className={`relative group cursor-pointer bg-white m-[20px]  flex flex-col flex-1 overflow-hidden`}
      onClick={handleCardClick}
    >
      <div className="flex flex-row overflow-hidden">
        <div className="w-1/3 overflow-hidden">
          <Image
            src={infor.imagePaths[0]}
            alt={infor.imagePaths[0]}
            className=" h-full w- overflow-hidden object-cover"
          />
        </div>
        <div className="p-4 text-left justify-center items-center">
          <p className="text-3xl font-bold">{infor.name}</p>
          <div className="text-xl">
            {/* <p className="text-[#008e28]">{infor.type}</p> */}
            <p className="text-gray-600 py-2">
              <span className="font-bold">Thời lượng: </span>
              {infor.length}
            </p>
            <p className="text-gray-600 py-2">
              <span className="font-bold">Quốc gia: </span>
              {infor.nation}
            </p>
            {/* <p className="text-gray-600 py-2">
              <span className="font-bold">Ngôn ngữ: </span>
              {infor.language}
            </p> */}
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
