import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import listMovie from "../constants/MovieList";
import { close, playCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import MovieSchedule from "../components/MovieSchedule/MovieSchedule";
import HorizontalMovieCard from "../modules/Movie/HorizontalMovieCard";
import { getDetailFilm } from "../services/getDetailFilm";
import { FadeLoader } from "react-spinners";
import { getUpComingFilm } from "../services/getUpComingFilm";
import Button from "../components/Button/Button";
import { UserContext } from "../contexts/UserContext";
import { Empty } from "antd";

const Movie = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const currentMovieId = parseInt(id);
  const [movie, setMovie] = useState({});
  const [listMovie, setListMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useContext(UserContext);
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate()

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  }

  function groupScreeningsByDate(screenings) {
    if (screenings) {
      const grouped = screenings.reduce((acc, screening) => {
        const date = screening.startTime.split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(screening);
        return acc;
      }, {});
      return Object.entries(grouped).map(([date, screenings]) => {
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}/${month}`;

        return {
          date: formattedDate,
          screenings,
        };
      });
    }
  }

  const fetchMovie = async () => {
    const res = await getUpComingFilm();
    setListMovie(res.data);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);
      const movie = await getDetailFilm(id);
      if (movie) {
        setMovie(movie);
      }
      setIsLoading(false);
    }
    getMovie();
  }, [id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1];
    const ampersandPosition = videoId?.indexOf("&");
    if (ampersandPosition !== -1) {
      return videoId?.substring(0, ampersandPosition);
    }
    return videoId;
  };

  const embedUrl = `https://www.youtube.com/embed/${getYouTubeEmbedUrl(
    movie.pathTrailer
  )}?autoplay=1`;

  if (!movie) {
    return <div>Rạp phim phá sản, hết phim</div>;
  }

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

  function getGenres(genres) {
    if (genres) {
      return genres.map((genre) => genre.name).join(", ");
    }
    return "";
  }

  const handleBookFilmUpcoming = () => {
    if (isLogin) {
      navigate(`/book-movie-ticket/${id}`);
    } else {
      toast.info("Vui lòng đăng nhập để đặt vé!", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <FadeLoader loading={isLoading} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex-1 bg-[#092B4B] pt-[111px]">
        <div className="bg-white">
          <div className="trailer-container ">
            <div className="video-preview w-full relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-xl"
                style={{
                  backgroundImage: `url(${movie.imagePaths ? movie.imagePaths?.[0] : null
                    })`,
                }}
              ></div>
              <img
                src={movie.imagePaths ? movie.imagePaths?.[0] : null}
                alt={movie.name}
                className="banner-image relative"
              />
              <IonIcon
                icon={playCircleOutline}
                className="play-trailer-icon"
                onClick={toggleModal}
              />
            </div>
          </div>

          <div className=" px-[100px] py-[75px] pt-0">
            <div className="flex-row flex pt-[50px] flex-1">
              <div className="transition translate-y-[-13%] z-40">
                <img
                  src={movie.imagePaths ? movie.imagePaths?.[0] : null}
                  alt={movie.name}
                  className="border-2 border-black rounded-lg w-[300px]"
                />
              </div>
              <div className="items-start  text-left ml-[50px] w-3/4 flex flex-col">
                <h1 className="text-3xl mb-[15px] font-semibold text-[#092b4b]">
                  {movie.name}
                </h1>

                <div className="grid grid-cols-1 gap-x-2 py-2 gap-2 text-xl w-full">
                  <div className="flex ">
                    <span className="font-bold mr-[12px] w-[15%]">
                      Đạo diễn:
                    </span>
                    <span className="w-[85%]">{movie.director}</span>
                  </div>

                  <div className="flex ">
                    <span className="font-bold mr-[12px] w-[15%]">
                      Diễn viên:
                    </span>
                    <span className="w-[85%]">{movie.actors}</span>
                  </div>

                  <div className="flex ">
                    <span className="font-bold mr-[12px] w-[15%]">
                      Thể loại:
                    </span>
                    <span className="w-[85%]">
                      {getGenres(movie.movieGenres)}
                    </span>
                  </div>

                  <div className="flex ">
                    <span className="font-bold mr-[12px] w-[15%]">
                      Khởi chiếu:
                    </span>
                    <span className="w-[85%]">
                      {formatDate(movie.releaseDay)}
                    </span>
                  </div>

                  <div className="flex ">
                    <span className="font-bold mr-[12px] w-[15%]">
                      Thời lượng:
                    </span>
                    <span className="w-[85%]">
                      {`${convertDurationToMinutes(movie.duration)} phút`}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="font-bold mr-[12px] w-[15%]">
                      Quốc gia:
                    </span>
                    <span className="w-[85%]">{movie.nation}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold mr-[12px] w-[15%]">
                      Ngôn ngữ:
                    </span>
                    <span className="w-[85%]">{movie.language}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-row flex pt-[0px] flex-1 justify-between">
              <div className="w-3/5 flex flex-col">
                <div className="">
                  <div
                    id="description-title"
                    className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
                  >
                    <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                      Nội dung
                    </h1>
                  </div>
                  <div className="w-[100%]">
                    <p className="text-[#092b4b] text-xl text-left leading-relaxed">
                      {movie.description}
                    </p>
                  </div>
                  {movie.imagePaths?.length >= 1 && (
                    <div>
                      <div
                        id="description-title"
                        className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
                      >
                        <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                          Hình ảnh
                        </h1>
                      </div>
                      <div className="flex gap-4">
                        {movie.imagePaths.slice(1).map((imagePath, index) => (
                          <img
                            key={index}
                            src={imagePath}
                            className="w-[25%] object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {movie.screenings?.length > 0 && (
                    <div className="mt-[60px]">
                      <div
                        id="description-title"
                        className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
                      >
                        <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                          Lịch chiếu
                        </h1>
                      </div>
                      <div>
                        {movie?.screenings && (
                          <MovieSchedule
                            data={groupScreeningsByDate(movie.screenings)}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {movie.screenings?.length === 0 && (
                    <div className="mt-[60px]">
                      <div
                        id="description-title"
                        className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
                      >
                        <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                          Lịch chiếu
                        </h1>
                      </div>
                      <Empty
                        className="mt-[40px]"
                        description={
                          <span className="text-[24px]">
                            Chưa có xuất chiếu nào cho phim này
                          </span>
                        }
                      />
                    </div>
                  )}

                  {movie.screenings?.length > 0 && (
                    <div className="mt-[50px]">
                      {user.role !== "ADMIN" && (
                        <Button
                          onClick={handleBookFilmUpcoming}
                          secondary
                          className="h-[120px] w-[350px] m-auto bg-[#092b4b] hover:text-[#092b4b]"
                        >
                          Đặt vé ngay
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-[#ced5db] w-1/3 flex flex-col">
                <div className="p-[15px]">
                  <div
                    id="big-text"
                    className="flex justify-center text-base text-[#c0c1c4] font-medium px-0 pt-[20px] gap-[0.7rem] text-left"
                  >
                    <h1 className="text-[#58636e] text-3xl font-medium text-left">
                      Phim sắp chiếu
                    </h1>
                  </div>
                  <div>
                    {listMovie
                      .filter((movie) => movie.id !== currentMovieId)
                      .slice(0, 4)
                      .map((movie) => (
                        <div key={movie.id}>
                          <HorizontalMovieCard infor={movie} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center transition-all duration-500 ease"
          onClick={toggleModal}
        >
          <div
            className="trailer-video w-1/2 h-[50vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <IonIcon
              icon={close}
              className="text-black text-5xl top-[30px] right-[30px] absolute cursor-pointer"
              onClick={toggleModal}
            />
            <iframe
              className="w-full h-full"
              // src="https://www.youtube.com/embed/ZgE25SPP2I8?autoplay=1"
              src={embedUrl}
              title={movie.title}
              frameBorder="0"
              allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
