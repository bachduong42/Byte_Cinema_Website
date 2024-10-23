
import { useState } from "react";
import Search from "../components/Layout/Search";
import { MdAddCircleOutline, MdFilterList } from "react-icons/md";
import Button from "../components/Button/Button";
import Movie1 from "../assets/images/movie1.jpg";
import Movie2 from "../assets/images/movie2.jpg";
import Movie3 from "../assets/images/movie3.jpg";
import Movie4 from "../assets/images/movie4.jpg";
import MovieCard from "../modules/Movie/MovieCard";
import { Link, useNavigate } from "react-router-dom";

function FilmManagement() {
    const [searchResult, setSearchResult] = useState([]);
    
    const [activeTab, setActiveTab] = useState('Tất cả');

    const navigate = useNavigate();

  const handleAddClick = () => {
    navigate(`/film-management/add`);
  };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const listMovie = [
        {
            id: 1,
            type: "Tình cảm",
            imagePaths: [Movie1],
            name: "THANH XUÂN 18x2",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "20.9.2023",
        },
        {
            id: 2,
            type: "Kinh dị",
            imagePaths: [Movie2],
            name: "CÔ DÂU HÀO MÔN",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
        },
        {
            id: 3,
            type: "Tình cảm",
            imagePaths: [Movie3],
            name: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
        },
        {
            id: 4,
            type: "Hài",
            imagePaths: [Movie4],
            name: "HÔN LỄ CỦA EM",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
        },
        {
            id: 5,
            type: "Tình cảm",
            imagePaths: [Movie3],
            name: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
        },
        {
            id: 6,
            type: "Tình cảm",
            imagePaths: [Movie3],
            name: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
        },
        {
            id: 7,
            type: "Tình cảm",
            imagePaths: [Movie4],
            name: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
        },
        {
            id: 8,
            type: "Tình cảm",
            imagePaths: [Movie2],
            name: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
        },
    ];
    return (
        <div className="flex min-h-[850px] h-auto   flex-col px-[130px] w-full mt-[150px]">
            <div className="flex justify-between w-full h-full">
                <Search searchResult={searchResult} setSearchResult={setSearchResult}></Search>
                <Button className="flex w-[170px] gap-1 px-2 bg-[#00B3FF] rounded-[5px] lg:h-[50px]  md:h-[35px]  h-[25px] text-white cursor-pointer" leftIcon={<MdAddCircleOutline className="text-white " />} onClick={handleAddClick}>
                    Tạo phim mới
                </Button>
            </div>
            <div className="w-full flex justify-between mt-5">
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400  gap-3">
                    <li class="me-2">
                        <a
                            href="#"
                            onClick={() => handleTabClick('Tất cả')}
                            className={`inline-block px-4 py-3 rounded-lg text-base ${activeTab === 'Tất cả'
                                ? 'text-white bg-[#092B4B] active'
                                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                            aria-current={activeTab === 'Tất cả' ? "page" : undefined}>Tất cả</a>
                    </li>
                    <li class="me-2">
                        <a
                            href="#"
                            onClick={() => handleTabClick('Đã đăng')}
                            className={`inline-block px-4 py-3 rounded-lg text-base ${activeTab === 'Đã đăng'
                                ? 'text-white bg-[#092B4B] active'
                                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                            aria-current={activeTab === 'Đã đăng' ? "page" : undefined}>Đã đăng</a>
                    </li>
                    <li class="me-2">
                        <a
                            href="#"
                            onClick={() => handleTabClick('Chưa đăng')}
                            className={`inline-block px-4 py-3 rounded-lg text-base ${activeTab === 'Chưa đăng'
                                ? 'text-white bg-[#092B4B] active'
                                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                            aria-current={activeTab === 'Chưa đăng' ? "page" : undefined}>Chưa đăng</a>
                    </li>
                </ul>
                <Button className="flex gap-2 bg-[#006A97] w-[110px] px-2 rounded-md text-base" leftIcon={<MdFilterList />}>Sắp xếp</Button>
            </div>
            <div className="w-full grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-[30px] justify-items-center mt-5">
                {listMovie.map((movie) => (
                    <MovieCard infor={movie} key={movie.id} cardInfor admin></MovieCard>
                ))}
            </div>
        </div>
    );
}

export default FilmManagement;