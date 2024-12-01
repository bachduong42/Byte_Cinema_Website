import React, { useRef, useCallback, useState, useEffect } from "react";
import MovieBanner from "../modules/Movie/MovieBanner";
import MovieCard from "../modules/Movie/MovieCard";
import { MdClose, MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import Button from "../components/Button/Button";
import { getListMovie } from "../services/getListMovie";
import MovieCommingSoon from "../modules/Movie/MovieCommingSoon"
import { BsFillPlayBtnFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDetailFilm } from "../services/getDetailFilm";
const Home = () => {
  const sliderRef = useRef(null);
  const coverflowRef = useRef(null);
  const swiperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [coverflowSlidesPerView, setCoverflowSlidesPerView] = useState(3);
  const [listMovie, setListMovie] = useState([]);
  const [listMovieUpComming, setListMovieUpcomming] = useState([])
  const [currentIndex, setCurrentIndex] = useState();
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin");
  const [currentUpcomingMovieId, setCurrentUpcomingMovieId] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [movie, setMovie] = useState({});
  const [autoPlay, setAutoPlay] = useState(true);
  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const res = await getListMovie();
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
        setListMovieUpcomming(filteredUpcomingMovies);
      } else {
        console.error("Data is not an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
    console.log(listMovie);
    console.log(listMovieUpComming)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesPerView(1);
        setCoverflowSlidesPerView(3);
      } else if (width >= 640) {
        setSlidesPerView(1);
        setCoverflowSlidesPerView(2);
      } else {
        setSlidesPerView(1);
        setCoverflowSlidesPerView(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const handlePrev = useCallback(() => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slidePrev();
    }
    if (coverflowRef.current && coverflowRef.current.swiper) {
      coverflowRef.current.swiper.slidePrev();
    }
  }, []);

  // const handleNext = useCallback(() => {
  //     if (sliderRef.current && sliderRef.current.swiper) {
  //         sliderRef.current.swiper.slideNext();
  //         console.log("loiiii")
  //     }
  //     if (coverflowRef.current && coverflowRef.current.swiper) {
  //         coverflowRef.current.swiper.slideNext();
  //     }
  // }, []);
  const handleNext = useCallback(() => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slideNext();
      console.log("Slider is navigating to next slide");
    } else {
      console.log("SliderRef or swiper is not available");
    }

    if (coverflowRef.current && coverflowRef.current.swiper) {
      coverflowRef.current.swiper.slideNext();
      console.log("Coverflow is navigating to next slide");
    } else {
      console.log("CoverflowRef or swiper is not available");
    }
  }, []);



  useEffect(() => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slideTo(1); // Start at the second slide
    }
  }, [listMovie.length]);
  const handleSlideChange = useCallback(() => {
    if (sliderRef.current) {
      const activeIndex = sliderRef.current.swiper.realIndex;
      if (coverflowRef.current && coverflowRef.current.swiper) {
        coverflowRef.current.swiper.slideToLoop(activeIndex);
        console.log(activeIndex + 1);
        // const activeMovie = listMovie[activeIndex]; // Lấy phim tương ứng từ danh sách

        // if (activeMovie) {
        //   setCurrentIndex(activeMovie.id); // Gán id phim vào currentIndex
        // }
        setCurrentIndex(activeIndex + 1)
      }

    }
  }, [sliderRef, coverflowRef]);

  useEffect(() => {
    // Lấy Swiper instance sau khi Swiper đã được render
    const swiperInstance = swiperRef.current.swiper;

    if (showTrailer) {
      swiperInstance.autoplay.stop(); // Dừng autoplay khi trailer đang hiển thị
    } else {
      swiperInstance.autoplay.start(); // Bật autoplay khi trailer không hiển thị
    }
  }, [showTrailer]);

  // console.log(sliderRef.current);
  const handleViewDetails = () => {
    navigate(`/movie/${currentIndex}`);
  }

  const handleViewFilm = () => {
    navigate(`/movie/${currentUpcomingMovieId}`);
  }
  const handleBookingClick = () => {
    if (isLogin) {
      navigate(`/book-movie-ticket/${currentIndex}`);
    } else {
      toast.info("Vui lòng đăng nhập để đặt vé!", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };
  const handleUpcomingSlideChange = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const activeIndex = swiperRef.current.swiper.realIndex; // Lấy chỉ số slide hiện tại
      if (listMovieUpComming && listMovieUpComming.length > 0) {
        const activeMovie = listMovieUpComming[activeIndex % listMovieUpComming.length];
        if (activeMovie) {
          console.log("Active Upcoming Movie:", activeMovie.id);
          setCurrentUpcomingMovieId(activeMovie.id); // Lưu ID vào state
        }
      }
    }
  }, [listMovieUpComming]);

  const handleBookFilmUpcoming = () => {
    if (isLogin) {
      navigate(`/book-movie-ticket/${currentUpcomingMovieId}`);
    } else {
      toast.info("Vui lòng đăng nhập để đặt vé!", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  }
  const fetchFilm = async () => {
    try {
      const data = await getDetailFilm(currentUpcomingMovieId);
      if (data) {
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleWatchTrailer = async () => {
    await fetchFilm();
    setShowTrailer(true);
  }
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1];
    const ampersandPosition = videoId?.indexOf("&");
    if (ampersandPosition !== -1) {
      return videoId?.substring(0, ampersandPosition);
    }
    return videoId;
  };
  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showTrailer]);

  useEffect(() => {
    if (showTrailer) {
      setAutoPlay(false);
    } else {
      setAutoPlay(true);
    }
  }, [showTrailer]);
  return (
    <>
      <div className="relative bg-[#092B4B] home min-h-screen">
        <Swiper
          ref={sliderRef}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={handleSlideChange}
        >
          {listMovie?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieBanner infor={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute flex  bottom-[120px] left-[100px] z-20 gap-10">
          <Button
            onClick={handleBookingClick}
            secondary>Đặt vé ngay</Button>
          <Button
            onClick={handleViewDetails}
            color={"#0DB1F6"}>Xem chi tiết</Button>
        </div>

        <div className="absolute flex gap-[30px] bottom-[50px] right-[100px] ">
          <div
            className="bg-[#676667] w-[50px] h-[50px] flex items-center justify-center rounded-[90px] cursor-pointer z-10"
            onClick={handlePrev}
          >
            <MdOutlineArrowBackIos className="text-white"></MdOutlineArrowBackIos>
          </div>
          <div
            className="bg-[#676667] w-[50px] h-[50px] flex items-center justify-center rounded-[90px] cursor-pointer z-10"
            onClick={handleNext}
          >
            <MdOutlineArrowForwardIos className="text-white" />
          </div>
        </div>
        <div className="absolute top-1/2 right-[50px] z-30 w-[50%] transform -translate-y-1/2">
          <Swiper
            ref={coverflowRef}
            effect={"coverflow"}
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            navigation
            modules={[EffectCoverflow, Navigation, Autoplay]}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {listMovie.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard
                  className="w-[224px] h-[332px]"
                  infor={movie}
                ></MovieCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {listMovieUpComming.length > 0 &&
        <div className="flex flex-col w-full bg-[#092B4B] px-[50px] py-[50px]">
          <div className="flex gap-2 items-center">
            <div className="text-[30px] text-white w-[15%] text-start font-semibold">
              Sắp chiếu
            </div>
            <hr className="border-t-2 border-[#0DB1F6] border w-[85%]" />
          </div>
          <div className="flex mt-[30px] pl-[40px]    ">
            <Swiper
              ref={swiperRef}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                enabled: autoPlay
              }}
              onSlideChange={handleUpcomingSlideChange}
            >
              {listMovieUpComming.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCommingSoon infor={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex gap-10 mt-8 pl-[200px]">
            <Button
              onClick={handleBookFilmUpcoming}
              secondary className="">
              Đặt vé ngay
            </Button>
            <div
              onClick={handleWatchTrailer}
              className="flex gap-1 items-center cursor-pointer">
              <Button color={"#0DB1F6"}>Xem trailer</Button>
              <BsFillPlayBtnFill className="text-white w-[25px] h-[25px]" />
            </div>
          </div>
          <Link
            className="text-[#0DB1F6] text-[24px] mt-[26px] p-3"
            to={"/movies/coming-soon"}
          >
            Xem thêm
          </Link>
        </div>
      }
      <div className="flex flex-col w-full bg-[#092B4B] px-[50px] py-[50px]">
        <div className="flex gap-2 items-center">
          <div className="text-[30px] text-white w-[15%] text-start font-semibold">
            Đang chiếu
          </div>
          <hr className="border-t-2 border-[#0DB1F6] border w-[85%]" />
        </div>
        <div className="flex flex-row w-full gap-[50px] mt-[80px]">
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            slidesPerView={listMovie.length >= 5 ? 5 : listMovie.length}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}

          >
            {listMovie.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard
                  cardInfor
                  className="w-[224px] h-[332px]"
                  infor={movie}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Link
          className="text-[#0DB1F6] text-[24px] mt-[30px] p-3"
          to={"/movies/now-showing"}
        >
          Xem thêm
        </Link>
      </div>
      {showTrailer && movie?.pathTrailer && (
        <div
          className="modal fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center transition-all duration-500 ease"
        >
          <div className="modal-content relative">
            <button className="absolute top-[-5px] right-[-5px] rounded-full w-[20px] h-[20px] bg-white flex justify-center items-center" onClick={() => setShowTrailer(false)}>
              <MdClose />
            </button>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(movie.pathTrailer)}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;