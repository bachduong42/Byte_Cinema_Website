import { Empty, Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { getMovieGenres } from '../services/getMovieGenres';
import { toast } from 'react-toastify';
import { getGenreByID } from '../services/genreService';
import { getListMovie } from '../services/getListMovie';
import MovieCard from '../modules/Movie/MovieCard';

function Categories() {
    const [genres, setGenres] = useState([]);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('0');
    const [selectedGenre, setSelectedGenre] = useState('0');
    const fetchGenre = async () => {
        const res = await getMovieGenres();
        if (res) {
            console.log(res);
            setGenres(res);
        }
    };
    useEffect(() => {
        fetchGenre();
    }, []);

    const fetchFilmsByGenre = async (genreId) => {
        setLoading(true);
        try {
            let res;

            if (genreId === '0') {
                res = await getListMovie(); // Lấy toàn bộ phim nếu không chọn thể loại
                setFilms(res.data);
            } else {
                res = await getGenreByID(genreId);
                setFilms(res.films);
            }
        } catch (error) {
            toast.error('Không thể tải danh sách phim.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenre(genreId); // Cập nhật genreId được chọn
        fetchFilmsByGenre(genreId);
    };

    useEffect(() => {
        setLoading(true);
        fetchFilmsByGenre('0');
    }, []);


    // const fetchFilmsByStatus = async (status) => {
    //     setLoading(true);
    //     try {
    //         const res = await getListMovie(); // Lấy toàn bộ phim
    //         let filteredFilms = res.data || []; // Đảm bảo dữ liệu không bị undefined
    //         const currentDate = new Date();

    //         if (status === '1') {
    //             // Lọc phim chưa chiếu
    //             filteredFilms = filteredFilms.filter((movie) => {
    //                 const releaseDate = new Date(movie.releaseDay);
    //                 return releaseDate > currentDate;
    //             });
    //         } else if (status === '2') {
    //             // Lọc phim đang chiếu
    //             filteredFilms = filteredFilms.filter((movie) => {
    //                 const releaseDate = new Date(movie.releaseDay);
    //                 return releaseDate <= currentDate;
    //             });
    //         }

    //         setFilms(filteredFilms); // Cập nhật danh sách phim đã lọc
    //     } catch (error) {
    //         toast.error("Không thể tải danh sách phim.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleStatusChange = (newStatus) => {
    //     fetchFilmsByStatus(newStatus);
    //     handleFetchFilm('0');

    // };


    return (
        <div className="w-full min-h-[700px] py-10 mt-[100px] flex flex-col px-[100px] gap-3">
            <div className='w-full justify-between flex'>
                <div className="flex text-start items-center gap-2">
                    <div className="w-[3px] h-[30px] bg-[#092B4B]"></div>
                    <span className="text-[30px]">Phim điện ảnh</span>
                </div>
                <div className='flex gap-3 items-center'>
                    <Select
                        showSearch
                        defaultValue="0"
                        className='w-[150px] shadow-sm border rounded-lg bg-[#00B3FF] text-white genre-dropdown cursor-pointer'
                        optionFilterProp="label"
                        onChange={handleGenreChange}
                        options={[
                            { value: '0', label: 'Tất cả' },
                            ...genres.map(genre => ({
                                value: genre.id,
                                label: genre.name,
                            })),
                        ]}
                    />
                    {/* <Select
                        showSearch
                        onChange={handleStatusChange}
                        defaultValue="0"
                        className='w-[200px]'
                        optionFilterProp="label"
                        options={[
                            { value: '0', label: 'Chưa chiếu/ Đang chiếu' },
                            { value: '1', label: 'Chưa chiếu' },
                            { value: '2', label: 'Đang chiếu' }
    
                        ]}
                    /> */}
                </div>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-2 lg:gap-x-5 pt-10'>

                {loading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} >
                            <Skeleton active title={false} paragraph={{ rows: 3 }} />
                        </div>
                    ))
                ) : films.length === 0 ? (
                    <Empty />
                ) : (
                    films.map((movie) => (
                        <MovieCard key={movie.id} cardInfor infor={movie} />
                    ))
                )}
            </div>

        </div>
    );
}

export default Categories;