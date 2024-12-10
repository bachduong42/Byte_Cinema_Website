
import { useEffect, useState } from "react";
import Search from "../components/Layout/Search";
import { MdAddCircleOutline, MdFilterList } from "react-icons/md";
import Button from "../components/Button/Button";
import MovieCard from "../modules/Movie/MovieCard";
import { getListMovie } from "../services/getListMovie";
import { useNavigate } from "react-router-dom";
import ModalDeleteMovie from "../components/Modal/ModalDeleteMovie";
import GenreTable from "../modules/Movie/GenreTable";
import { getMovieGenres } from "../services/getMovieGenres";
import ModalAddGenre from "../modules/Genre/ModalAddGenre";

function FilmManagement() {
  const [searchResult, setSearchResult] = useState([]);

  const [activeTab, setActiveTab] = useState('Tất cả');
  const [openModalDelMovie, setOpenModalDelMovie] = useState(false);
  const navigate = useNavigate();
  const [openModalAddGenre, setOpenModalAddGenre] = useState(false);

  const handleAddClick = () => {
    navigate(`/film-management/add`);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [listAllMovie, setListAllMovie] = useState([]);
  const [listMovie, setListMovie] = useState([]);
  const [listMovieUpComing, setListMovieUpComing] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [idmovieToDelete, setIdMovieToDelete] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const fetchMovie = async () => {
    try {
      const res = await getListMovie();
      // console.log("API Response:", res);
      if (res.data && Array.isArray(res.data)) {
        const currentDate = new Date();
        const filteredReleasedMovies = res.data.filter(movie => {
          const releaseDate = new Date(movie.releaseDay);
          return releaseDate < currentDate;
        });
        const filteredUpcomingMovies = res.data.filter(movie => {
          const releaseDate = new Date(movie.releaseDay);
          return releaseDate > currentDate;
        });
        setListMovie(filteredReleasedMovies);
        setListMovieUpComing(filteredUpcomingMovies);
        const combinedMovies = [...filteredReleasedMovies, ...filteredUpcomingMovies];
        setListAllMovie(combinedMovies);
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
  const fetchGenres = async () => {
    try {
      const access_token = localStorage.getItem("accessToken");
      const res = await getMovieGenres(access_token);
      if (res && Array.isArray(res)) {
        setMovieGenres(res);
      } else {
        console.error("Data is not an array:", res);
      }
    } catch (error) {
      console.error("Error fetching genre data:", error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  useEffect(() => {
    if (activeTab === 'Tất cả') {
      setFilteredMovies(listAllMovie);
    } else if (activeTab === 'Đang chiếu') {
      setFilteredMovies(listMovie);
    } else if (activeTab === 'Sắp chiếu') {
      setFilteredMovies(listMovieUpComing);
    }
  }, [activeTab, listAllMovie, listMovie, listMovieUpComing]);

  const handleOpenDeleteModal = (id) => {
    setIdMovieToDelete(id);
    setOpenModalDelMovie(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenModalDelMovie(false);
    setIdMovieToDelete(null);
  };
  const handleOpenAddGenre = () => {
    setOpenModalAddGenre(true);
  }

  return (
    <div className="flex min-h-[850px] h-auto flex-col md:px-[130px] w-full mt-[150px] pb-5">

      <div className="w-full flex justify-between mt-5 mb-5">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400  gap-3">
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('Tất cả')}
              className={`inline-block px-4 py-3 rounded-lg text-base ${activeTab === 'Tất cả'
                ? 'text-white bg-[#092B4B] active'
                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
              aria-current={activeTab === 'Tất cả' ? "page" : undefined}>Tất cả</a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('Đang chiếu')}
              className={`inline-block px-4 py-3 rounded-lg text-base ${activeTab === 'Đang chiếu'
                ? 'text-white bg-[#092B4B] active'
                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
              aria-current={activeTab === 'Đang chiếu' ? "page" : undefined}>Đang chiếu</a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('Sắp chiếu')}
              className={`inline-block px-4 py-3 rounded-lg text-base ${activeTab === 'Sắp chiếu'
                ? 'text-white bg-[#092B4B] active'
                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
              aria-current={activeTab === 'Sắp chiếu' ? "page" : undefined}>Sắp chiếu</a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('Thể loại')}
              className={`inline-block px-4 py-3 rounded-lg text-base ${activeTab === 'Thể loại'
                ? 'text-white bg-[#092B4B] active'
                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
              aria-current={activeTab === 'Thể loại' ? "page" : undefined}>Thể loại</a>
          </li>
        </ul>
        {activeTab !== "Thể loại" ?
          <Button className="flex w-[170px] gap-1 px-2 bg-[#00B3FF] rounded-[5px] lg:h-[50px]  md:h-[35px]  h-[25px] text-white cursor-pointer" leftIcon={<MdAddCircleOutline className="text-white " />} onClick={handleAddClick}>
            Tạo phim mới
          </Button> :
          <Button
            onClick={handleOpenAddGenre}
            className="flex w-[170px] gap-1 px-2 bg-[#092B4B] rounded-[5px] lg:h-[50px]  md:h-[35px]  h-[25px] text-white cursor-pointer" leftIcon={<MdAddCircleOutline className="text-white " />} >
            Thêm thể loại
          </Button>}
        {/* <Button className="flex gap-2 bg-[#006A97] w-[110px] px-2 rounded-md text-base" leftIcon={<MdFilterList />}>Sắp xếp</Button> */}
      </div>
      {activeTab !== "Thể loại" ? (
        <div className="w-full grid lg:grid-cols-6 sm:grid-cols-3 gap-[30px] justify-items-center mt-5">
          {filteredMovies.map((movie) => (
            <MovieCard
              infor={movie}
              key={movie.id}
              cardInfor
              admin
              happening={listMovie.some(m => m.id === movie.id)}
              type="update"
              onDelete={() => handleOpenDeleteModal(movie.id)}
            />
          ))}
        </div>
      ) : (
        <GenreTable movieGenres={movieGenres} fetchGenres={fetchGenres}></GenreTable>
      )}
      {openModalDelMovie &&
        <ModalDeleteMovie
          handleClose={handleCloseDeleteModal}
          idDel={idmovieToDelete}>
        </ModalDeleteMovie>}
      {openModalAddGenre &&
        <ModalAddGenre handleClose={() => setOpenModalAddGenre(false)} mode="add" onSuccess={fetchGenres}></ModalAddGenre>}
    </div>
  );
}

export default FilmManagement;