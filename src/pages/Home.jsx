import React, { useRef, useCallback, useState, useEffect } from "react";
import MovieBanner from "../modules/Movie/MovieBanner";
import MovieCard from "../modules/Movie/MovieCard";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import "swiper/swiper-bundle.css";
import { BiMoviePlay } from "react-icons/bi";
import Movie1 from "../assets/images/movie1.jpg";
import Movie2 from "../assets/images/movie2.jpg";
import Movie3 from "../assets/images/movie3.jpg";
import Movie4 from "../assets/images/movie4.jpg";
import sapchieu from "../assets/images/sapchieu.png"
import Button from "../components/Button/Button";
import MovieCommingSoon from "../modules/Movie/MovieCommingSoon";
import  listMovie  from "../constants/MovieList";

const Home = () => {
    const sliderRef = useRef(null);
    const coverflowRef = useRef(null);
    const swiperRef = useRef(null);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const [coverflowSlidesPerView, setCoverflowSlidesPerView] = useState(3);

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

    const handleNext = useCallback(() => {
        if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.slideNext();
        }
        if (coverflowRef.current && coverflowRef.current.swiper) {
            coverflowRef.current.swiper.slideNext();
        }
    }, []);
    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop(); // Dừng autoplay
        }
    };

    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start(); // Bắt đầu autoplay lại
        }
    };

    // const listMovie = [
    //     {
    //         id: 1,
    //         type: "Tình cảm",
    //         image: Movie1,
    //         title: "THANH XUÂN 18x2",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "20.9.2023",
    //     },
    //     {
    //         id: 2,
    //         type: "Kinh dị",
    //         image: Movie2,
    //         title: "CÔ DÂU HÀO MÔN",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "11.2.2024",
    //     },
    //     {
    //         id: 3,
    //         type: "Tình cảm",
    //         image: Movie3,
    //         title: "KẺ ẨN DANH",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "11.2.2024",
    //     },
    //     {
    //         id: 4,
    //         type: "Hài",
    //         image: Movie4,
    //         title: "HÔN LỄ CỦA EM",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "11.2.2024",
    //     },
    //     {
    //         id: 5,
    //         type: "Tình cảm",
    //         image: Movie3,
    //         title: "KẺ ẨN DANH",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "11.2.2024",
    //     },
    //     {
    //         id: 6,
    //         type: "Tình cảm",
    //         image: Movie3,
    //         title: "KẺ ẨN DANH",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "11.2.2024",
    //     },
    //     {
    //         id: 7,
    //         type: "Tình cảm",
    //         image: Movie4,
    //         title: "KẺ ẨN DANH",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "11.2.2024",
    //     },
    //     {
    //         id: 8,
    //         type: "Tình cảm",
    //         image: Movie2,
    //         title: "KẺ ẨN DANH",
    //         time: "1h50p",
    //         description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
    //         date: "11.2.2024",
    //     },
    // ];
    const listComming = [
        {
            title: "KHÔNG NÓI ĐIỀU DỮ",
            image: sapchieu,
            type: 'Ảo tưởng/ Hành động',
            description: "Lâm - một người đàn ông từng là xã hội đen nhưng lại mất trí nhớ và nay đang lẩn trốn như một người bình thường, kiếm sống bằng lao động chân tay. Lâm sống cùng vợ - Hạnh và con gái riêng của cô là Hiền. Hiền vẫn chưa chấp nhận tình yêu thương của chú Lâm dành cho mình. Hiền lớn lên với sự bốc đồng và bị dụ dỗ bởi Tiến",
            date: "30/9/2024"
        },
        {
            title: "KHÔNG NÓI ĐIỀU DỮ",
            image: Movie4,
            type: 'Ảo tưởng/ Hành động',
            description: "Lâm - một người đàn ông từng là xã hội đen nhưng lại mất trí nhớ và nay đang lẩn trốn như một người bình thường, kiếm sống bằng lao động chân tay. Lâm sống cùng vợ - Hạnh và con gái riêng của cô là Hiền. Hiền vẫn chưa chấp nhận tình yêu thương của chú Lâm dành cho mình. Hiền lớn lên với sự bốc đồng và bị dụ dỗ bởi Tiến",
            date: "30/9/2024"
        },
    ]

    return (
        <>
            <div className="relative bg-[#092B4B] home">
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
                >
                    {listMovie.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <MovieBanner infor={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute flex  bottom-[150px] left-[100px] z-20 gap-10">
                    <Button secondary >Đặt vé ngay</Button>
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
                        effect={'coverflow'}
                        spaceBetween={20}
                        slidesPerView={coverflowSlidesPerView}
                        loop={true}
                        grabCursor={true}
                        centeredSlides={true}
                        navigation
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                        className="mySwiper"
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        autoplay=
                        {{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    >
                        {listMovie.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <div className="">
                                    <MovieCard className="w-[224px] h-[332px]" infor={movie}></MovieCard>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
            <div className="flex flex-col w-full bg-[#092B4B] px-[50px] py-[50px]">
                <div className="flex gap-2 items-center">
                    <div className="text-[30px] text-white w-[15%] text-start font-semibold">Đang chiếu</div>
                    <hr className="border-t-2 border-[#0DB1F6] border w-[85%]" />
                </div>

                <div className="flex flex-row w-full gap-[50px] mt-[80px] pl-[40px]">
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
                                <MovieCard cardInfor className="w-[224px] h-[332px]" infor={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
            <div className="flex flex-col w-full bg-[#092B4B] px-[50px] py-[50px]">
                <div className="flex gap-2 items-center">
                    <div className="text-[30px] text-white w-[15%] text-start font-semibold">Sắp chiếu</div>
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
                        {listComming.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <MovieCommingSoon infor={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex gap-10 mt-8 pl-[200px]">
                    <Button secondary className="">Đặt vé ngay</Button>
                    <div className="flex gap-1 items-center cursor-pointer">
                        <Button color={"#0DB1F6"}>Xem trailer</Button>
                        <BiMoviePlay className="text-white w-[25px] h-[25px]" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
