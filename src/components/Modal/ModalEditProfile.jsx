import { MdClose } from "react-icons/md";
import avatartDefault from "../../assets/images/hy.jpg"
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button/Button"
import { UserContext } from "../../contexts/UserContext";
function ModalNotifyLogin({ handleClose }) {
    const [profile, setProfile] = useState({
        email: "",
        name: "",
        phoneNumber: "",
        gender: null,
        avatar: "",
    })
    const { user } = useContext(UserContext);
    // console.log(user);
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        if (user) {
            setProfile(user);
        }
    })
    console.log(profile);

    const handleFileChange = (e) => {
        const [file] = e.target.files;

        if (!file) return;

        const types = ['image/jpeg', 'image/jpg', 'image/png'];
        if (types.includes(file.type)) {
            const fileUrl = URL.createObjectURL(file);
            setAvatar(fileUrl);
        } else {
            toast.error('Định dạng file không hợp lệ!', { autoClose: 3000 });
        }
    };
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={handleClose}
            >
                <div
                    className="modal h-[450px] w-[700px]  flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex pt-2 items-center h-[70px] relative w-full justify-center">
                        <div className="text-[23px] font-bold text-[#008E28]">THAY ĐỔI THÔNG TIN CÁ NHÂN</div>
                        <MdClose
                            className="text-[20px] font-bold cursor-pointer absolute right-5 top-7  "
                            onClick={handleClose}
                        />
                    </div>
                    <hr className="w-[90%]" />

                    <div className="flex gap-8 w-full h-[300px] px-7 ">
                        <div className="w-1/3 h-full flex justify-center items-center">
                            <div className="w-[180px] h-[180px] relative">
                                <img src={avatar || avatartDefault} alt="" className="rounded-full w-full h-full object-cover" />
                                <div className="absolute bottom-0 right-5 ">
                                    <div className="sm:w-[32px] sm:h-[32px] w-[25px] h-[25px] bg-white cursor-pointer border border-[#d0d0d3] rounded-full flex items-center justify-center">
                                        <label htmlFor="avatar-upload">
                                            <svg
                                                width="16" data-e2e=""
                                                height="16" viewBox="0 0 48 48"
                                                fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M26.5858 5.08579C27.3479 4.32371 28.5767 4.30253 29.3646 5.03789L36.8646 12.0379C37.2612 12.408 37.4904 12.9232 37.4997 13.4655C37.5091 14.0078 37.2977 14.5307 36.9142 14.9142L16.9142 34.9142C16.5391 35.2893 16.0304 35.5 15.5 35.5H8.5C7.39543 35.5 6.5 34.6046 6.5 33.5V26C6.5 25.4696 6.71071 24.9609 7.08579 24.5858L26.5858 5.08579ZM28.0479 9.2805L10.5 26.8284V31.5H14.6716L32.622 13.5496L28.0479 9.2805Z"></path><path d="M7 41C7 40.4477 7.44772 40 8 40H41C41.5523 40 42 40.4477 42 41V43C42 43.5523 41.5523 44 41 44H8C7.44772 44 7 43.5523 7 43V41Z"></path></svg>
                                        </label>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 h-full flex flex-col justify-center gap-5 px-3">
                            <div className="flex items-center">
                                <span className="text-[18px] w-1/3 font-semibold text-start">Họ và tên:</span>
                                <input
                                    value={profile?.name}
                                    type="text" className="border border-[#6da9c4] outline w-2/3 h-[37px] outline-none rounded-md px-2 bg-[#d9e9f0] text-[#092B4B] flex justify-center items-center" />
                            </div>
                            <div className="flex items-center">
                                <span className="text-[18px] w-1/3 font-semibold text-start">Giới tính:</span>
                                <div className="flex gap-5">
                                    <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="1"
                                            className="mr-2"
                                        />
                                        Nam
                                    </label>
                                    <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="2"
                                            className="mr-2"

                                        />
                                        Nữ
                                    </label>
                                    <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="0"
                                            className="mr-2"
                                        />
                                        Khác
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="text-[18px] w-1/3 font-semibold text-start">Email:</span>
                                <input
                                    value={profile?.email}
                                    disabled={true} type="text" className="border border-[#6da9c4] outline w-2/3 h-[37px] outline-none rounded-md px-2 bg-[#d9e9f0] text-[#092B4B]" />
                            </div>
                            <div className="flex items-center">
                                <span className="text-[18px] w-1/3 font-semibold  text-start">Số điện thoại:</span>
                                <input
                                    value={profile?.phoneNumber}
                                    type="text" className="border border-[#6da9c4] outline w-2/3 h-[37px] outline-none rounded-md px-2 bg-[#d9e9f0] text-[#092B4B]" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-10 justify-center">
                        <button
                            onClick={handleClose}
                            className="w-[120px] border border-[#008E28] bg-white text-[#008E28] h-[37px] rounded-md">Huỷ</button>
                        <button className="w-[120px]  bg-[#008E28]  text-white h-[37px] rounded-md">Cập nhật</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalNotifyLogin;