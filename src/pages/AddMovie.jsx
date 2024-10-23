import { useState } from "react";
import NoImage from "../assets/images/no-image.svg";


function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    actors: "",
    genre: "",
    duration: "",
    country: "",
    language: "",
    type: "",
    content: "",
    images: [NoImage],
    poster: "",
    trailer: "",
  });

  const [releaseDate, setReleaseDate] = useState(new Date());

  const isSubmitButtonEnabled =
    !movie.title ||
    !movie.director ||
    !movie.actors ||
    !movie.genre ||
    !movie.duration ||
    !movie.country ||
    !movie.language ||
    !movie.type ||
    !movie.content ||
    !movie.poster ||
    !movie.trailer ||
    movie.images.filter((image) => image !== NoImage).length === 0;

  const movieTypes = ["18+", "PG-13", "Mọi lứa tuổi"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const isInputValid = () => {
    return Object.values(movie)
      .filter((value) => typeof value === "string")
      .every((value) => value.trim() !== "");
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   console.log(movie.images);
  //   if (isInputValid()) {
  //     console.log(movie.images);
  //   } else {
  //     alert("Invalid input: fields cannot contain only spaces.");
  //   }
  // };

  const handleSave = (e) => {
    e.preventDefault();
    if (isInputValid()) {
      const filteredMovie = {
        ...movie,
        images: movie.images.filter((image) => image !== NoImage),
      };
      console.log(filteredMovie);
      console.log(
        movie.images.filter((image) => image !== NoImage).length
      );
    } else {
      alert("Invalid input: fields cannot contain only spaces.");
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...movie.images];
        newImages[index] = reader.result;
        if (newImages.length < 6 && newImages[index] !== NoImage) {
          newImages.push(NoImage);
        }
        setMovie({
          ...movie,
          images: newImages,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMovie({ ...movie, poster: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex-1 bg-[#092B4B] pt-[111px]">
        <div className="bg-white py-[40px]">
          <div className="w-[90%] mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
              THÊM PHIM MỚI
            </h2>
            <div
              id="description-title"
              className="flex text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-left"
            >
              <h1 className="text-[#092b4b] text-3xl font-medium text-left">
                Thông tin
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-x-2 py-4 text-2xl w-full">
              {/* <div className="flex items-center py-2 text-2xl font-semibold">
                <div className="w-[50%] flex items-center gap-[7px] mr-[20px]">
                  <IonIcon
                    icon={timeOutline}
                    className="text-[#FE9051] text-3xl"
                  />
                  <p>Time</p>
                </div>
                <div className="w-[50%] flex items-center gap-[10px]">
                  <IonIcon
                    icon={calendarOutline}
                    className="text-[#FE9051] text-2xl"
                  />
                  <p>Date</p>
                </div>
              </div> */}
              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Tên bộ phim</span>
                <input
                  type="text"
                  name="title"
                  value={movie.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md "
                />
              </div>

              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Đạo diễn:</span>
                <input
                  type="text"
                  name="director"
                  value={movie.director}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Diễn viên:</span>
                <input
                  type="text"
                  name="actors"
                  value={movie.actors}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Thể loại:</span>
                <input
                  type="text"
                  name="genre"
                  value={movie.genre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Thời lượng:</span>
                <input
                  type="text"
                  name="duration"
                  value={movie.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Quốc gia:</span>
                <input
                  type="text"
                  name="country"
                  value={movie.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Ngôn ngữ:</span>
                <input
                  type="text"
                  name="language"
                  value={movie.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Loại phim:</span>
                <select
                  name="type"
                  value={movie.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="" disabled hidden>
                    Chọn loại phim
                  </option>
                  {movieTypes.map((type, index) => (
                    <option
                      key={index}
                      value={type === "Chọn loại phim" ? "" : type}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-start py-2 justify-center mb-4">
                <span className="font-bold mr-[20px] w-[50%]">Nội dung:</span>
                <textarea
                  name="content"
                  value={movie.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
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
                {movie.poster ? (
                  <img
                    src={movie.poster}
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

                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
                <span className="font-bold mr-[20px] w-[50%]">YouTube trailer link :</span>
                <input
                  type="text"
                  name="trailer"
                  value={movie.trailer}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
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

export default AddMovie;
