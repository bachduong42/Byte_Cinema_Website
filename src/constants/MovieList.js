import Movie1 from "../assets/images/movie1.jpg";
import Movie2 from "../assets/images/movie2.jpg";
import Movie3 from "../assets/images/movie3.jpg";
import Movie4 from "../assets/images/movie51.jpg";
import Movie5 from "../assets/images/movie5.jpg";

import Banner1 from "../assets/banners/banner1.jpg";
import Banner2 from "../assets/banners/banner2.jpg";
import Banner3 from "../assets/banners/banner3.jpg";
import Banner4 from "../assets/banners/banner4.jpg";
import Banner5 from "../assets/banners/banner5.jpg";

const listMovie = [
        {
            id: 1,
            type: "Tình cảm",
            image: Movie1,
            title: "THANH XUÂN 18x2",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "20.9.2023",
            banner: Banner1,
            trailer:"https://www.youtube.com/watch?v=8Pq08VsVUFk",
            language:"Tiếng Nhật - Phụ đề Tiếng Việt",
            director:"Fujii Michihito",
            actors:"Greg Hsu, Kaya Kiyohara, Chang Chen, Kuroki Hitomi, Michieda Shunsuke, ...",
            country:"Nhật Bản"

        },
        {
            id: 2,
            type: "Kinh dị",
            image: Movie2,
            title: "CÔ DÂU HÀO MÔN",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
            banner: Banner2,
            trailer:"https://www.youtube.com/watch?v=QJ8E9R70csY",
            language:"Tiếng Việt - Phụ đề Tiếng Anh",
            director:"Vũ Ngọc Đãng",
            actors:"Uyển Ân, Samuel An, Thu Trang, Lê Giang, Kiều Minh Tuấn, NSND Hồng Vân,...",
            country:"Việt Nam"
        },
        {
            id: 3,
            type: "Tình cảm",
            image: Movie3,
            title: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
            banner: Banner3,
            trailer:"https://www.youtube.com/watch?v=9yVmRrrxoOc",
            language:"Tiếng Việt - Phụ đề Tiếng Anh",
            director:"Trần Trọng Dần",
            actors:"Kiều Minh Tuấn, Mạc Văn Khoa, Quốc Trường, Vân Trang, Mai Cát Vi,...",
            country:"Việt Nam"
        },
        {
            id: 4,
            type: "Hài",
            image: Movie4,
            title: "HÔN LỄ CỦA EM",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
            banner: Banner4,
            trailer:"https://www.youtube.com/watch?v=8HHwMcCdnJA",
            language:"Tiếng Trung - Phụ đề Tiếng Việt",
            director:"Tên đạo diễn",
            actors:"Diễn Viên A, Diễn Viên B, Diễn Viên C, Diễn Viên D, Diễn Viên E,...",
            country:"Trung Quốc"
        },
        {
            id: 5,
            type: "Hoạt hình",
            image: Movie5,
            title: "Bocchi the Rock!",
            time: "1h32p",
            description: 'Hitori Gotoh, hay còn gọi là "Bocchi-chan", là một cô gái cực kỳ nhút nhát và luôn e ngại khi tiếp xúc với người khác. Mỗi khi nói chuyện, cô thường bắt đầu với câu “À...”. Khi còn học cấp hai, cô bắt đầu học guitar vì mong muốn tham gia một ban nhạc. Cô nghĩ rằng, nhờ chơi nhạc, ngay cả một người nhút nhát như mình cũng có thể tỏa sáng. Nhưng vì không có bạn, cô chỉ có thể tập đàn một mình mỗi ngày suốt 6 tiếng. Sau khi trở thành một tay guitar giỏi, cô đăng các video chơi đàn lên mạng dưới tên “Guitar Hero” và luôn mơ mộng về việc biểu diễn tại lễ hội trường. Tuy nhiên, cô không tìm được ai để cùng lập ban nhạc, và rồi cô nhận ra mình đã lên cấp ba mà vẫn chưa kết bạn được với ai! Cô gần như trở thành một người sống thu mình, nhưng một ngày nọ, Nijika Ijichi, tay trống của ban nhạc Kessoku, đã tìm đến cô. Từ đó, cuộc sống hàng ngày của cô bắt đầu thay đổi từng chút một...',
            date: "11.10.2024",
            banner: Banner5,
            trailer:"https://www.youtube.com/watch?v=8inoUCVaPYg",
            language:"Tiếng Nhật - Phụ đề Tiếng Việt",
            director:"Keiichiro Saito",
            actors:"Yoshino Aoyama; Sayumi Suzushiro; Saku Mizuno; Ikumi Hasegawa",
            country:"Nhật Bản"
        },
        {
            id: 6,
            type: "Tình cảm",
            image: Movie3,
            title: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
            banner: Banner3,
            trailer:"https://www.youtube.com/watch?v=8Pq08VsVUFk",
            language:"Tiếng Việt - Phụ đề Tiếng Anh",
            director:"Trần Trọng Dần",
            actors:"Kiều Minh Tuấn, Mạc Văn Khoa, Quốc Trường, Vân Trang, Mai Cát Vi,...",
            country:"Việt Nam"
        },
        {
            id: 7,
            type: "Tình cảm",
            image: Movie4,
            title: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
            banner: Banner4,
            trailer:"https://www.youtube.com/watch?v=8Pq08VsVUFk",
            language:"Tiếng Việt - Phụ đề Tiếng Anh",
            director:"Trần Trọng Dần",
            actors:"Kiều Minh Tuấn, Mạc Văn Khoa, Quốc Trường, Vân Trang, Mai Cát Vi,...",
            country:"Việt Nam"
        },
        {
            id: 8,
            type: "Tình cảm",
            image: Movie2,
            title: "KẺ ẨN DANH",
            time: "1h50p",
            description: "Answer Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups s",
            date: "11.2.2024",
            banner: Banner2,
            trailer:"https://www.youtube.com/watch?v=8Pq08VsVUFk",
            language:"Tiếng Việt - Phụ đề Tiếng Anh",
            director:"Trần Trọng Dần",
            actors:"Kiều Minh Tuấn, Mạc Văn Khoa, Quốc Trường, Vân Trang, Mai Cát Vi,...",
            country:"Việt Nam"
        },
        ];
    
    export default listMovie;