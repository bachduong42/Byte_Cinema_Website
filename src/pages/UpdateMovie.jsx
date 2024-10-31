import { useContext, useEffect, useState } from "react";
import NoImage from "../assets/images/no-image.svg";
import { getMovieGenres } from "../services/getMovieGenres";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { updateMovieRequest } from "../services/updateMovie";
import { getDetailFilm } from "../services/getDetailFilm";
function UpdateMovie() {
    const { id } = useParams();
    // const [movie, setMovie] = useState({});
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [movie, setMovie] = useState({
        name: "",
        director: "",
        actors: "",
        genre: 0,
        duration: "",
        nation: "",
        // language: "",
        releaseDay: new Date().toISOString(),
        description: "",
        images: [NoImage],
        poster: null,
        posterPreview: null,
        pathTrailer: "",
    });

    useEffect(() => {
        async function getMovie() {
            // setIsLoading(true);
            const movieData = await getDetailFilm(id);
            const imagePaths = movieData.imagePaths || [];
            const initialImages = await Promise.all(imagePaths.slice(1, 6).map(async (path) => {
                const response = await fetch(path);
                const blob = await response.blob();
                return { file: new File([blob], `image.jpg`, { type: "image/jpeg" }), imagePreview: path };
            }));

            if (initialImages.length < 6) {
                initialImages.push({ imagePreview: NoImage });
            }
            if (movieData) {
                let posterFile = null;
                if (imagePaths && imagePaths.length > 1) {
                    const response = await fetch(imagePaths[0], { mode: "cors" });
                    const blob = await response.blob();
                    posterFile = new File([blob], "poster.jpg", { type: "image/jpeg" });
                }

                setMovie(prevMovie => ({
                    ...prevMovie,
                    ...movieData,
                    genre: movieData.movieGenres[0].id + 1,
                    posterPreview: imagePaths && imagePaths.length > 1 ? imagePaths[0] : null,
                    poster: posterFile,
                    images: initialImages,
                }));

            }
        }

        getMovie();
        console.log("Initial movie1: ", movie);

    }, [id]);


    const [movieGenres, setMovieGenres] = useState([]);


    const navigate = useNavigate();
    const isSubmitButtonEnabled =
        !movie.name ||
        !movie.director ||
        !movie.actors ||
        // !movie.genre ||
        !movie.duration ||
        !movie.nation ||
        !movie.releaseDay ||
        // !movie.language ||
        // !movie.type ||
        !movie.description ||
        !movie.poster ||
        !movie.pathTrailer ||
        movie.images.filter((image) => image !== NoImage).length === 0;
    let access_token = "";

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                access_token = localStorage.getItem("accessToken");
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
        fetchGenres();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({
            ...movie,
            [name]: typeof movie[name] === "number" ? Number(value) : value,
        });
    };

    const handleDateChange = (date) => {
        const isoString = date.toISOString();
        setMovie({
            ...movie,
            releaseDay: isoString,
        });
        setReleaseDate(date);
    };

    const isInputValid = () => {
        return Object.values(movie)
            .filter((value) => typeof value === "string")
            .every((value) => value.trim() !== "");
    };

    // const isImageFilesArray = (imageFiles) => {
    //     return (
    //         Array.isArray(imageFiles) &&
    //         imageFiles.every((file) => file instanceof File)
    //     );
    // };

    const isImageFilesArray = (imageFiles) => {
        if (!Array.isArray(imageFiles)) {
            console.error("imageFiles is not an array");
            return false;
        }

        const invalidFiles = imageFiles.filter(file => !(file instanceof File));
        if (invalidFiles.length > 0) {
            console.error("Invalid files found:", invalidFiles);
            return false;
        }

        return true;
    };
    const handleSave = async (e) => {
        e.preventDefault();

        if (isInputValid()) {
            console.log("Pre-filtered: ", movie.images)
            const filteredImages = movie.images.filter(image => image.imagePreview !== '/src/assets/images/no-image.svg' && image !== '/src/assets/images/no-image.svg' && image.imagePreview !== null && image.file instanceof File  && !image.imagePreview.endsWith('.svg') && !(typeof image === 'string' && image.endsWith('.svg')));
            console.log("Filtered: ", filteredImages)
            if (!filteredImages.includes(movie.poster)) {
                filteredImages.unshift(movie.poster);
            }
            filteredImages[0] = {
                file: movie.poster,
                imagePreview: movie.posterPreview,
            };
            const filteredMovie = {
                ...movie,
                images: filteredImages,
            };
            console.log(filteredMovie);
            // console.log(filteredImages.length);
            // console.log(movie.releaseDay);
            const imageFiles = filteredMovie.images.map((image) => image.file);
            if (isImageFilesArray(imageFiles)) {
                handleUpdateMovie(filteredMovie);
                // console.log("Valid image files.");
            } else {
                alert("Invalid image files.");
            }
        } else {
            alert("Invalid input: fields cannot contain only spaces.");
        }
    };
    const handleUpdateMovie = async (_movie) => {
        try {
            const form_data = new FormData();
            _movie.images.forEach((image) => {
                console.log("Image from images: ", image.file);
                console.log("File type: ", image.file.type);
                const _file = image.file;
                form_data.append(`imageFiles`, _file);
            });
            form_data.append(
                "movie-info",
                new Blob(
                    [
                        JSON.stringify({
                            description: _movie.description,
                            duration: _movie.duration,
                            name: _movie.name,
                            releaseDay: _movie.releaseDay,
                            genreIds: [_movie.genre],
                            imagePaths: [],
                            director: _movie.director,
                            nation: _movie.nation,
                            actors: _movie.actors,
                            pathTrailer: _movie.pathTrailer,
                        }),
                    ],
                    { type: "application/json" }
                )
            );

            const res = await updateMovieRequest(
                localStorage.getItem("accessToken"),
                form_data,
                id
            );
            toast.success("Cập nhật phim thành công", {
                autoClose: 1000,
            });
            console.log("update movie response: ", res);
            navigate("/film-management");
        } catch (error) {
            console.error("UPdate movie error: ", error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại", {
                autoClose: 1000,
            });
            throw error;
        }
    }

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error("Vui lòng upload ảnh đúng định dạng", {
                    autoClose: 1000,
                });
                return;
            }
            const imagePreview = URL.createObjectURL(file);
            const newImages = [...movie.images];
            newImages[index] = { file, imagePreview };
            if (newImages.length < 6 && newImages[index] !== NoImage) {
                newImages.push(NoImage);
            }
            setMovie({
                ...movie,
                images: newImages,
            });
        }
        console.log(movie.images);
    };
    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error("Vui lòng upload ảnh đúng định dạng", {
                    autoClose: 1000,
                });
                return;
            }
            const posterPreview = URL.createObjectURL(file);

            setMovie({ ...movie, poster: file, posterPreview });
        }
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

    return (
        <>
            <div className="flex-1 bg-[#092B4B] pt-[111px]">
                <div className="bg-white py-[40px]">
                    <div className="w-[75%] mx-auto p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
                            CẬP NHẬT PHIM
                        </h2>
                        <div
                            id="description-title"
                            className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
                        >
                            <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                                Thông tin
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 gap-x-2 py-4 text-xl w-full">
                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">Tên bộ phim</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={movie.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md "
                                />
                            </div>

                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">Đạo diễn:</span>
                                <input
                                    type="text"
                                    name="director"
                                    value={movie.director}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">Diễn viên:</span>
                                <input
                                    type="text"
                                    name="actors"
                                    value={movie.actors}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">Thời lượng:</span>
                                <input
                                    type="text"
                                    name="duration"
                                    value={movie.duration}
                                    onChange={handleChange}
                                    maxLength={5}
                                    className="w-full px-3 py-2 border rounded-md"
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onPaste={(e) => {
                                        const paste = (
                                            e.clipboardData || window.Clipboard
                                        ).getData("text");
                                        if (!/^\d+$/.test(paste)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">Quốc gia:</span>
                                <input
                                    type="text"
                                    name="nation"
                                    value={movie.nation}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">Thể loại:</span>
                                <select
                                    name="genre"
                                    value={movie.genre}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value={0} disabled hidden>
                                        Chọn thể loại phim
                                    </option>
                                    {movieGenres.map((genre) => (
                                        <option key={genre.id} value={Number(genre.id)}>
                                            {genre.name + " - " + genre.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">
                                    Ngày khởi chiếu:
                                </span>
                                <div className=" flex w-[100%] bg-white items-start justify-start self-start">
                                    <DatePicker
                                        selected={movie.releaseDay}
                                        onChange={handleDateChange}
                                        className={
                                            "form-control form-control-sm w-[100%] px-3 py-2 border rounded-md items-start justify-start self-start"
                                        }
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start py-2 justify-center mb-4">
                                <span className="font-bold mr-[00px] w-[40%]">Nội dung:</span>
                                <textarea
                                    name="description"
                                    value={movie.description}
                                    onChange={handleChange}
                                    className="w-full px-3 py-5 border rounded-md overflow-y-auto"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>

                        <div
                            id="description-title"
                            className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
                        >
                            <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                                Hình ảnh
                            </h1>
                        </div>

                        <div className="flex mb-4 flex-row">
                            <div className="relative p-2 h-[500px] flex items-center justify-center w-1/3 mr-[20px]">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handlePosterChange}
                                />
                                {movie.posterPreview ? (
                                    <img
                                        src={movie.posterPreview}
                                        alt="Poster"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-[500px] flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md px-3">
                                        <span className="text-gray-500">
                                            Click to upload poster
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-2 p-2 w-2/3 h-full">
                                {movie.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative p-2 h-[200px] flex items-center justify-center bg-gray-200 w-full"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
                                        {image && image.imagePreview ? (
                                            <img
                                                src={image.imagePreview}
                                                alt={`Image ${index}`}
                                                className="w-full h-full object-contain"
                                            />
                                        )
                                            : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md px-3">
                                                    <span className="text-gray-500">
                                                        Click to upload image
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="py-4 text-2xl w-full mb-[100px]">
                            <div
                                id="description-title"
                                className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
                            >
                                <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                                    Trailer
                                </h1>
                            </div>
                            <div className="flex items-center py-2 justify-center mb-4">
                                <span className="font-bold mr-[20px] w-[50%]">
                                    YouTube trailer link :
                                </span>
                                <input
                                    type="text"
                                    name="pathTrailer"
                                    value={movie.pathTrailer}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div
                                className="trailer-video w-full h-[50vh] items-center justify-center flex-1 flex"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <iframe
                                    className="w-full h-full"
                                    // src="https://www.youtube.com/embed/ZgE25SPP2I8?autoplay=1"
                                    src={embedUrl}
                                    title={movie.name}
                                    frameBorder="0"
                                    allow="encrypted-media; accelerometer; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div className="flex justify-center gap-20">
                            <button
                                type="button"
                                className="px-8 py-4 bg-red-500 text-white rounded-md text-2xl"
                                onClick={() => setMovie({})}
                            >
                                Hủy
                            </button>
                            <button
                                // type="submit"
                                // className="px-8 py-4 bg-green-600 text-white rounded-md text-2xl"
                                type="submit-button"
                                className="px-8 py-4  text-white rounded-md text-2xl border-none cursor-pointer transition-all duration-500 ease-in-out"
                                disabled={isSubmitButtonEnabled}
                                style={{
                                    backgroundColor: isSubmitButtonEnabled
                                        ? "#e3e3e3"
                                        : "#16a34a",
                                }}
                                onClick={handleSave}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateMovie;
