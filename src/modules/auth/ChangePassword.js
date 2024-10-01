import { useRef, useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { close, eyeOffOutline, eyeOutline, closeSharp } from 'ionicons/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../../assets/images/logo.png';


const ChangePassword = ({ setModalRef, openLoginModal }) => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');


    const cpOverlayRef = useRef();
    const cpOuterBoxRef = useRef();
    const fadeAnimateRef = useRef();
    const chibiContainerRef = useRef();
    const tlRef = useRef();

    const isCPButtonEnabled = !newPassword || !confirmNewPassword || newPassword.length < 6 || confirmNewPassword.length < 6 || newPassword !== confirmNewPassword;

    useGSAP(() => {
        const tl = gsap.timeline({ paused: true });
        tl.to(cpOverlayRef.current, { display: 'flex' })
            .from(cpOverlayRef.current, { duration: 0.3, backgroundColor: 'rgba(0,0,0,0)', ease: 'expo.out' })
            .from(cpOuterBoxRef.current, { duration: 0.3, scaleY: 0, ease: 'expo.out' })
            .from(fadeAnimateRef.current, { duration: 0.3, opacity: 0, ease: 'power4.out' })
            .from(chibiContainerRef.current, { duration: 0.7, yPercent: 100, ease: 'power4.out' }, 1);
        tlRef.current = tl;
    }, []);

    useEffect(() => {
        setModalRef({
            openChangePasswordModal,
        });
    }, [setModalRef]);

    const openChangePasswordModal = () => {
        tlRef.current.restart();
    };

    const closeChangePasswordModal = () => {
        tlRef.current.reverse();
        setTimeout(() => {
            setNewPassword('');
            setConfirmNewPassword('');
            setNewPasswordError('');
            setConfirmNewPasswordError('');
        }, 700);
    };

    const handleChangePassword = (event) => {
        event.preventDefault();
        console.log('New Password:', newPassword);
        console.log('Confirm New Password:', confirmNewPassword);
        handleDirectToLoginClick();
    };

    //   const handleBlur = (event) => {
    //     if (!event.target.value) {
    //       event.target.style.borderColor = 'red';
    //     } else {
    //       event.target.style.borderColor = '';
    //     }
    //   };

    const handleOverlayClick = (event) => {
        if (event.target === cpOverlayRef.current) {
            closeChangePasswordModal();
        }
    };

    const togglePasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible);
    };


    const validatePassword = () => {
        if (newPassword.length === 0) {
            setNewPasswordError('Vui lòng nhập mật khẩu')
        } else if (newPassword.length < 6) {
            setNewPasswordError('Mật khẩu phải có ít nhất 6 ký tự')
        } else {
            setNewPasswordError('');
        }
    }

    const validateConfirmPassword = () => {
        if (confirmNewPassword.length === 0) {
            setConfirmNewPasswordError('Vui lòng nhập mật khẩu');
        } else if (confirmNewPassword.length < 6) {
            setConfirmNewPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
        } else if (confirmNewPassword !== newPassword) {
            setConfirmNewPasswordError('Mật khẩu không khớp');
        }
        else {
            setConfirmNewPasswordError('');
        }
    }

    const handleDirectToLoginClick = () => {
        closeChangePasswordModal();
        setTimeout(() => {
          openLoginModal();
        }, 500);
      };

    

    return (
        <>
            <div id="cp-overlay" ref={cpOverlayRef} className='fixed z-5 inset-0 bg-[rgba(0,0,0,0.5)]  items-center justify-center hidden' onMouseDown={handleOverlayClick}>
                <div id="cp-outer-box" ref={cpOuterBoxRef} className='relative w-[30rem] items-center justify-center self-center'>

                    <div id="chibi-container" className='relative w-full h-[130px]' ref={chibiContainerRef}>
                        <img id='chibi-img default-img active' src={logo} alt="chibi" className='block absolute w-[150px] left-1/2 top-full -translate-x-1/2 logo-login-modal transition-all duration-500 ease-in-expo' />
                    </div>

                    <div id="cp-inner-box" className='relative z-2 bg-white rounded-xl h-full p-[20px]'>
                        <div id="close-div" className='w-full h-max mb-[1rem] flex justify-end' onClick={closeChangePasswordModal}>
                            <IonIcon icon={close} id='close' className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                        </div>

                        <div className="fade-animate" ref={fadeAnimateRef}>
                            <h2 className='text-center mb-[1rem]'>ĐỔI MẬT KHẨU</h2>
                            {/* <form autoComplete='off' action='/' method='post' className='w-full p-[20px]' onSubmit={handleSubmit}> */}
                            <div className='w-full p-[20px]'>


                                <div className="input mb-[1.5rem]">
                                    <div className='relative flex-row'>
                                        <input type={isNewPasswordVisible ? "text" : "password"} name="password"  placeholder="Mật khẩu mới" required className=' w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]' onChange={(e) => setNewPassword(e.target.value)} onBlur={validatePassword} value={newPassword} />

                                        {newPassword.length > 0 && (
                                            <div className='absolute right-[51px] top-[50%] transform -translate-y-[11px]' onClick={() => setNewPassword("")}>
                                                <IonIcon icon={closeSharp} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                                            </div>
                                        )}

                                        <div className='right-[11px] top-[50%] transform -translate-y-[11px] absolute' onClick={togglePasswordVisibility}>
                                            <IonIcon icon={isNewPasswordVisible ? eyeOutline : eyeOffOutline} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                                        </div>

                                    </div>
                                    <div className='ml-[15px] mt-[3px]'>
                                        <span name='error' id='password-error' className='text-[13px] error text-red-600 text-start flex'>  {newPasswordError}</span>
                                    </div>
                                </div>

                                <div className="input mb-[1.5rem]">
                                    <div className='relative flex-row'>
                                        <input type={isConfirmNewPasswordVisible ? "text" : "password"} name="password" placeholder="Nhập lại mật khẩu mới" required className=' w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]' onChange={(e) => setConfirmNewPassword(e.target.value)} onBlur={validateConfirmPassword} value={confirmNewPassword} />

                                        {confirmNewPassword.length > 0 && (
                                            <div className='absolute right-[51px] top-[50%] transform -translate-y-[11px]' onClick={() => setConfirmNewPassword("")}>
                                                <IonIcon icon={closeSharp} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                                            </div>
                                        )}

                                        <div className='right-[11px] top-[50%] transform -translate-y-[11px] absolute' onClick={toggleConfirmPasswordVisibility}>
                                            <IonIcon icon={isNewPasswordVisible ? eyeOutline : eyeOffOutline} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                                        </div>

                                    </div>
                                    <div className='ml-[15px] mt-[3px]'>
                                        <span name='error' id='password-error' className='text-[13px] error text-red-600 text-start flex'>  {confirmNewPasswordError}</span>
                                    </div>

                                </div>

                                <button type='submit-button' className='w-full text-base p-[10px] mt-[1rem] bg-[#e3e3e3] text-[rgba(0,0,0,0.5)] border-none cursor-pointer rounded-xl transition-all duration-500 ease-in-out' disabled={isCPButtonEnabled} style={{ backgroundColor: isCPButtonEnabled ? '#e3e3e3' : '#db9a45' }} onClick={handleChangePassword}>Đổi mật khẩu</button>
                            {/* </form> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;