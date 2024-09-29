import { useRef, useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { close, eyeOffOutline, eyeOutline, closeSharp } from 'ionicons/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../../assets/images/logo.png';


const Login = ({ setModalRef }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const loginOverlayRef = useRef();
  const loginOuterBoxRef = useRef();
  const fadeAnimateRef = useRef();
  const chibiContainerRef = useRef();
  const tlRef = useRef();

  const isLoginButtonEnabled = !email || !password || password.length < 6;

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(loginOverlayRef.current, { display: 'flex' })
      .from(loginOverlayRef.current, { duration: 0.3, backgroundColor: 'rgba(0,0,0,0)', ease: 'expo.out' })
      .from(loginOuterBoxRef.current, { duration: 0.3, scaleY: 0, ease: 'expo.out' })
      .from(fadeAnimateRef.current, { duration: 0.3, opacity: 0, ease: 'power4.out' })
      .from(chibiContainerRef.current, { duration: 0.7, yPercent: 100, ease: 'power4.out' }, 1);
    tlRef.current = tl;
  }, []);

  useEffect(() => {
    setModalRef({
      openLoginModal,
    });
  }, [setModalRef]);

  const openLoginModal = () => {
    tlRef.current.restart();
  };

  const closeLoginModal = () => {
    tlRef.current.reverse();
    setTimeout(() => {
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
    }, 700);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', email);
    console.log('Password:', password);
  };

  // const handleBlur = (event) => {
  //   if (!event.target.value) {
  //     event.target.style.borderColor = 'red';
  //   } else {
  //     event.target.style.borderColor = '';
  //   }
  // };

  const handleOverlayClick = (event) => {
    if (event.target === loginOverlayRef.current) {
      closeLoginModal();
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const checkInputEmail = () => {
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      setEmailError('Vui lòng nhập email')
    } else if (!emailValidate.test(email)) {
      setEmailError('Email không hợp lệ')
    } else {
      setEmailError('');
    }
  }

  const checkInputPassword = () => {
    if (password.length === 0) {
      setPasswordError('Vui lòng nhập mật khẩu')
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự')
    } else {
      setPasswordError('');
    }
  }

  return (
    <>
      <div id="login-overlay" ref={loginOverlayRef} className='fixed z-5 inset-0 bg-[rgba(0,0,0,0.5)]  items-center justify-center hidden' onMouseDown={handleOverlayClick}>
        <div id="login-outer-box" ref={loginOuterBoxRef} className='relative w-[30rem] items-center justify-center self-center'>

          <div id="chibi-container" className='relative w-full h-[130px]' ref={chibiContainerRef}>
            <img id='chibi-img default-img active' src={logo} alt="chibi" className='block absolute w-[150px] left-1/2 top-full -translate-x-1/2 logo-login-modal transition-all duration-500 ease-in-expo' />
          </div>

          <div id="login-inner-box" className='relative z-2 bg-white rounded-xl h-full p-[20px]'>
            <div id="close-div" className='w-full h-max mb-[1rem] flex justify-end' onClick={closeLoginModal}>
              <IonIcon icon={close} id='close' className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
            </div>

            <div className="fade-animate" ref={fadeAnimateRef}>
              <h2 className='text-center mb-[1rem]'>ĐĂNG NHẬP</h2>
              <form autoComplete='off' action='/' method='post' className='w-full p-[20px]' onSubmit={handleSubmit}>

                <div className="input mb-[1.5rem]">
                  <div className='flex-row'>
                    <input type="text" name="username" id='username-input' placeholder="Email" required className=' w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]' onChange={(e) => setEmail(e.target.value)} onBlur={checkInputEmail} value={email} />

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

                <div className="input mb-[1.5rem]">
                  <div className='relative flex-row'>
                    <input type={isPasswordVisible ? "text" : "password"} name="password" id='username-password' placeholder="Mật khẩu" required className=' w-full px-[15px] py-[10px] bg-[#f8f6f6] rounded-xl   focus:outline-none focus:border focus:border-[#db9a45] pr-[88px]' onChange={(e) => setPassword(e.target.value)} onBlur={checkInputPassword} value={password} />

                    {password.length > 0 && (
                      <div className='absolute right-[51px] top-[50%] transform -translate-y-[11px]' onClick={() => setPassword("")}>
                        <IonIcon icon={closeSharp} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                      </div>
                    )}

                    <div className='right-[11px] top-[50%] transform -translate-y-[11px] absolute' onClick={togglePasswordVisibility}>
                      <IonIcon icon={isPasswordVisible ? eyeOutline : eyeOffOutline} className='text-[rgba(0,0,0,0.5)] text-2xl cursor-pointer' />
                    </div>

                  </div>
                  <div className='ml-[15px] mt-[3px]'>
                    <span name='error' id='password-error' className='text-[13px] error text-red-600 text-start flex'>  {passwordError}</span>
                  </div>

                </div>

                <div id="cta-help" className='p-0 text-sm flex justify-end'>
                  <a href='#' className='text-[#db9a45]'>Quên mật khẩu</a>
                </div>

                <button type='submit-button' id='submit-button' className='w-full text-base p-[10px] mt-[1rem] bg-[#e3e3e3] text-[rgba(0,0,0,0.5)] border-none cursor-pointer rounded-xl transition-all duration-500 ease-in-out' disabled={isLoginButtonEnabled} style={{ backgroundColor: isLoginButtonEnabled ? '#e3e3e3' : '#db9a45' }}>Đăng nhập</button>
              </form>

              <div id="register-line" className='flex justify-center text-base text-[#c0c1c4] font-medium px-0 py-[20px] gap-[0.7rem] text-center'>
                Bạn chưa có tài khoản ?<a href='#' className='text-[#db9a45]'>Đăng ký ngay</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;