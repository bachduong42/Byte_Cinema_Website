import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getListMovie } from "../services/getListMovie";
import MovieCard from "../modules/Movie/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "../hook/useDebounce";
import { FadeLoader } from "react-spinners";

function DetailedMovieList() {
  const param = useParams();
  const [nowList, setNowList] = useState([]);
  const [upComingList, setUpComingList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchNowList, setSearchNowList] = useState([]);
  const [searchUpComingList, setSearchUpComingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedValue = useDebounce(searchValue.trim(), 600);
  console.log(debouncedValue);
  const fetchMovie = async () => {
    try {
      const res = await getListMovie();
      if (res.data && Array.isArray(res.data)) {
        const currentDate = new Date();

        const filteredReleasedMovies = res.data.filter((movie) => {
          const releaseDate = new Date(movie.releaseDay);
          return releaseDate < currentDate;
        });

        const filteredUpcomingMovies = res.data.filter((movie) => {
          const releaseDate = new Date(movie.releaseDay);
          return releaseDate > currentDate;
        });

        setNowList(filteredReleasedMovies);
        setSearchNowList(filteredReleasedMovies);
        setUpComingList(filteredUpcomingMovies);
        setSearchUpComingList(filteredUpcomingMovies);
        setIsLoading(false)
      } else {
        console.error("Data is not an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    setSearchValue('')
  },[param])

  useEffect(() => {
    if (debouncedValue) {
      param.type === "coming-soon"
        ? setSearchUpComingList(
            upComingList.filter((movie) =>
              movie.name.toLowerCase().includes(debouncedValue.toLowerCase())
            )
          )
        : setSearchNowList(
            nowList.filter((movie) =>
              movie.name.toLowerCase().includes(debouncedValue.toLowerCase())
            )
          );
    } else {
      param.type === "coming-soon"
        ? setSearchUpComingList(upComingList)
        : setSearchNowList(nowList);
    }
  }, [debouncedValue]);

  console.log(isLoading)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <FadeLoader loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="pt-[100px] px-[20px] pb-[50px] lg:pt-[160px] lg:px-[80px] lg:pb-[50px]">
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-[20px] lg:text-[40px] font-medium">
          {param.type === "coming-soon" ? "Phim sắp chiếu" : "Phim đang chiếu"}
        </h1>
        <div className="flex items-center w-[200px] sm:w-[360px] md:w-[450px] h-[50px] border border-solid border-gray-300 rounded-[999px] overflow-hidden">
          <input
            value={searchValue}
            onChange={(e) => {
              e.target.value = e.target.value.trimStart();
              setSearchValue(e.target.value);
            }}
            type="text"
            placeholder="Nhập tên phim"
            className="flex-1 h-[100%] border-none outline-none text-[16px] px-4"
          ></input>
          <button
            className="text-[22px] w-[40px] flex items-center justify-center"
            disabled
          >
            <FontAwesomeIcon className="pr-4" icon={faMagnifyingGlass} />
          </button>
        </div>
        <Link
          to={`${
            param.type === "coming-soon"
              ? "/movies/now-showing"
              : "/movies/coming-soon"
          }`}
          className="text-[16px] md:text-[18px] lg:text-[30px]"
        >
          {param.type === "coming-soon" ? "Phim đang chiếu" : "Phim sắp chiếu"}
        </Link>
      </div>
      {(param.type === "coming-soon" && searchUpComingList.length > 0) ||
      (param.type === "now-showing" && searchNowList.length > 0) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-2 lg:gap-x-5">
          {param.type === "coming-soon"
            ? searchUpComingList.map((movie) => (
                <MovieCard key={movie.id} cardInfor infor={movie} />
              ))
            : searchNowList.map((movie) => (
                <MovieCard key={movie.id} cardInfor infor={movie} />
              ))}
        </div>
      ) : (
        <div className="text-[24px]">Không tìm thấy phim nào</div>
      )}
    </div>
  );
}

export default DetailedMovieList;
