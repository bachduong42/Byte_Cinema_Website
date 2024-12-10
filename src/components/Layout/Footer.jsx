import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"
import Image from "../Image/Image";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
function Footer() {
  const { user } = useContext(UserContext)
    return (
      <div className="bg-[#092B4B]">
        <hr className="border-t-0 border-[#0DB1F6] border w-full" />
        <div className="flex justify-around mt-[50px]">
          {/* Logo và tên hệ thống */}
          <Link to={user?.role === "ADMIN" ? "/film-management" : "/"}>
            <div className="flex flex-col items-start justify-center">
              <Image
                src={logo}
                alt="Bytes Cinema Logo"
                className="w-[40px] h-[30px] md:w-[50px] md:h-[45px] lg:w-[60px] lg:h-[55px]"
              />
              <div className="pixel-text lg:text-[32px] md:text-[25px] text-base leading-5 text-white">
                Bytes
              </div>
              <div className="text-[#43CFFB] lg:text-xl md:text-[18px] text-[12px] playfair-text">
                Cinema
              </div>
            </div>
          </Link>
          {/* Về chúng tôi */}
          <div className="flex flex-col items-start gap-3">
            <div className="nunito-text text-white text-[24px] font-semibold">
              Về chúng tôi
            </div>
            <div className="nunito-text text-white text-[20px]">
              Hệ thống đặt vé xem phim trực tuyến
            </div>
            <div className="nunito-text text-white text-[20px]">
              Cập nhật lịch chiếu mới nhất
            </div>
            <div className="nunito-text text-white text-[20px]">
              Đội ngũ hỗ trợ tận tình
            </div>
          </div>
          {/* Dịch vụ */}
          <div className="flex flex-col items-start gap-3">
            <div className="nunito-text text-white text-[24px] font-semibold">
              Dịch vụ
            </div>
            <div className="nunito-text text-white text-[20px]">
              Đặt vé nhanh chóng, tiện lợi
            </div>
            <div className="nunito-text text-white text-[20px]">
              Đa dạng các suất chiếu và phim hot
            </div>
            <div className="nunito-text text-white text-[20px]">
              Hệ thống thanh toán an toàn
            </div>
          </div>
          {/* Hỗ trợ */}
          <div className="flex flex-col items-start gap-3">
            <div className="nunito-text text-white text-[24px] font-semibold">
              Hỗ trợ
            </div>
            <div className="nunito-text text-white text-[20px]">
              Câu hỏi thường gặp
            </div>
            <div className="nunito-text text-white text-[20px]">
              Chính sách hoàn vé
            </div>
            <div className="nunito-text text-white text-[20px]">
              Liên hệ: support@bytescinema.com
            </div>
          </div>
        </div>
        <hr className="border-t-0 border-[#AEAEAE] border mt-[50px] w-[80%] mx-auto" />
        {/* Footer thông tin bản quyền */}
        <div className="w-[80%] mx-auto py-[40px] flex justify-between">
          <div className="nunito-text text-[18px] font-normal text-[#797979]">
            © 2024 Bytes Cinema. Tất cả các quyền được bảo lưu.
          </div>
          <div className="nunito-text text-[18px] font-normal text-white">
            Liên hệ: 0123-456-789
          </div>
        </div>
      </div>
    );
}

export default Footer