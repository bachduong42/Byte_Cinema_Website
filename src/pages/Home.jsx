import React, { useRef, useCallback, useState, useEffect } from "react";
import MovieBanner from "../modules/Movie/MovieBanner";
import MovieCard from "../modules/Movie/MovieCard";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import Button from "../components/Button/Button";
import { getListMovie } from "../services/getListMovie";
import MovieCommingSoon from "../modules/Movie/MovieCommingSoon"
import { BsFillPlayBtnFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const Home = () => {
  const sliderRef = useRef(null);
  const coverflowRef = useRef(null);
  const swiperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [coverflowSlidesPerView, setCoverflowSlidesPerView] = useState(3);
  const [listMovie, setListMovie] = useState([]);
  const [listMovieUpComming, setListMovieUpcomming] = useState([])


  const fetchMovie = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchMovie();
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
      }
    }
  }, [sliderRef, coverflowRef]);
  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };


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
          {listMovie.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieBanner infor={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute flex  bottom-[150px] left-[100px] z-20 gap-10">
          <Button secondary>Đặt vé ngay</Button>
          <Button color={"#0DB1F6"}>Xem chi tiết</Button>
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
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {listMovieUpComming.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCommingSoon infor={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex gap-10 mt-8 pl-[200px]">
          <Button secondary className="">
            Đặt vé ngay
          </Button>
          <div className="flex gap-1 items-center cursor-pointer">
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
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
    </>
  );
};

export default Home;