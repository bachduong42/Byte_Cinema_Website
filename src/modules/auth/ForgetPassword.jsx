import { useRef, useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { close, closeSharp } from 'ionicons/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../../assets/images/logo.png';
import { forgetPasswordService } from '../../services/login';
import { toast } from 'react-toastify';


const ForgetPassword = ({ setModalRef, openChangePasswordModal }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');


    const fpOverlayRef = useRef();
    const fpOuterBoxRef = useRef();
    const fadeAnimateRef = useRef();
    const chibiContainerRef = useRef();
    const tlRef = useRef();

    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isSendOtpButtonEnabled = !email || !emailValidate.test(email);
    const isVerifyOtpButtonEnabled = !otp || otp.length < 6 || isSendOtpButtonEnabled;

    useGSAP(() => {
        const tl = gsap.timeline({ paused: true });
        tl.to(fpOverlayRef.current, { display: 'flex' })
            .from(fpOverlayRef.current, { duration: 0.3, backgroundColor: 'rgba(0,0,0,0)', ease: 'expo.out' })
            .from(fpOuterBoxRef.current, { duration: 0.3, scaleY: 0, ease: 'expo.out' })
            .from(fadeAnimateRef.current, { duration: 0.3, opacity: 0, ease: 'power4.out' })
            .from(chibiContainerRef.current, { duration: 0.7, yPercent: 100, ease: 'power4.out' }, 1);
        tlRef.current = tl;
    }, []);

    useEffect(() => {
        setModalRef({
            openForgetPasswordModal,
        });
    }, [setModalRef]);

    const openForgetPasswordModal = () => {
        tlRef.current.restart();
    };

    const closeForgetPasswordModal = () => {
        tlRef.current.reverse();
        setTimeout(() => {
            setEmail('');
            setEmailError('');
            setOtp('');
            setOtpError('');
        }, 700);
    };

    const handleFPClick = () => {
        closeForgetPasswordModal();
        setTimeout(() => {
            openChangePasswordModal();
        }, 500);
    };

    const handleSendOtp = async (event) => {
        event.preventDefault();
        console.log('Email:', email);
        try {
            const result = await forgetPasswordService(email);
            if (result) {
                toast.info("Kiểm tra email để đặt lại mật khẩu");
            }
            closeForgetPasswordModal();
            // handleFPClick();
        } catch (error) {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    // const handleVerifyOtp = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const result = await sendOTPService(email, otp);
    //         if (result) {
    //             toast.success("Xác thực tài khoản thành công");
    //             handleFPClick();
    //         }
    //     } catch (error) {
    //         toast.error("Xác thực không thành công.");
    //     }
    // };

    const handleOverlayClick = (event) => {
        if (event.target === fpOverlayRef.current) {
            closeForgetPasswordModal();
        }
    };

    const validateEmail = () => {
        if (email.length === 0) {
            setEmailError('Vui lòng nhập email')
        } else if (!emailValidate.test(email)) {
            setEmailError('Email không hợp lệ')
        } else {
            setEmailError('');
        }
    }

    // const validateOtp = () => {
    //     if (otp.length === 0) {
    //         setOtpError('Vui lòng nhập OTP')
    //     } else if (otp.length !== 6) {
    //         setOtpError('OTP phải có 6 kí tự')
    //     } else {
    //         setOtpError('');
    //     }
    // }

    return (
        <>
            <div id="fp-overlay" ref={fpOverlayRef} className='fixed z-5 inset-0 bg-[rgba(0,0,0,0.5)]  items-center justify-center hidden' onMouseDown={handleOverlayClick}>
                <div id="fp-outer-box" ref={fpOuterBoxRef} className='relative w-[30rem] items-center justify-center self-center'>

                    <div id="chibi-container" className='relative w-full h-[130px]' ref={chibiContainerRef}>
                        <img id='chibi-img default-img active' src={logo} alt="chibi" className='block absolute w-[150px] left-1/2 top-full -translate-x-1/2 logo-login-modal transition-all duration-500 ease-in-expo' />
                    </div>

                    <div id="fp-inner-box" className='relative z-2 bg-white rounded-xl h-full p-[20px]'>
                        <div id="close-div" className='w-full h-max mb-[1rem] flex justify-end' onClick={closeForgetPasswordModal}>
                            <IonIcon icon={close} id='close' className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                        </div>

                        <div className="fade-animate" ref={fadeAnimateRef}>
                            <h2 className='text-center mb-[1rem]'>QUÊN MẬT KHẨU</h2>
                            {/* <form autoComplete='off' action='/' method='post' className='w-full p-[20px]' onSubmit={handleSubmit}> */}
                            <div className='w-full p-[20px]'>

                                <div className="input mb-[1rem]">
                                    <div className='flex-row'>
                                        <input type="text" name="username" placeholder="Gửi tới Email" required className=' w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]' onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} value={email} />

                                        {email.length > 0 && (
                                            <div className='right-[51px] top-[131px] absolute' onClick={() => setEmail("")}>
                                                <IonIcon icon={closeSharp} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                                            </div>
                                        )}
                                    </div>
                                    <div className='ml-[15px] mt-[3px]'>
                                        <span name='error' id='username-error' className='text-[13px] error text-red-600 text-start flex'>  {emailError}</span>
                                    </div>

                                </div>
                                <button type='button' className='w-1/2 text-base p-[10px] mt-[00.5rem] bg-[#e3e3e3] text-[rgba(0,0,0,0.5)] border-none cursor-pointer rounded-xl transition-all duration-500 ease-in-out' disabled={isSendOtpButtonEnabled} style={{ backgroundColor: isSendOtpButtonEnabled ? '#e3e3e3' : '#db9a45' }} onClick={handleSendOtp}>Xác thực</button>

                                {/* <div className="input mb-[1.5rem] mt-[2rem]">
                                    <div className='relative flex-row'>
                                        <input type="text" name="otp" placeholder="Nhập OTP" required className=' w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]' onChange={(e) => setOtp(e.target.value)} onBlur={validateOtp} value={otp} maxLength={6} onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }} />

                                        {otp.length > 0 && (
                                            <div className='right-[11px] top-[50%] transform -translate-y-[11px] absolute' onClick={() => setOtp("")}>
                                                <IonIcon icon={closeSharp} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                                            </div>
                                        )}
                                    </div>
                                    <div className='ml-[15px] mt-[3px]'>
                                        <span name='error' id='otp-error' className='text-[13px] error text-red-600 text-start flex'>  {otpError}</span>
                                    </div>
                                </div>
                                <button type='button' className='w-1/2 text-base p-[10px] mt-[1rem] bg-[#e3e3e3] text-[rgba(0,0,0,0.5)] border-none cursor-pointer rounded-xl transition-all duration-500 ease-in-out' disabled={isVerifyOtpButtonEnabled} style={{ backgroundColor: isVerifyOtpButtonEnabled ? '#e3e3e3' : '#db9a45' }} onClick={handleVerifyOtp}>Xác nhận</button> */}




                                {/* </form> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;