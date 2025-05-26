import { useRef } from 'react';
import { gsap } from 'gsap';
import type Lenis from 'lenis';
import type { TabType } from '@/types';
import { useModal } from '@/hooks/useModal';
import LoginForm from '@/components/organisms/modal/LoginForm';
import SignupForm from '@/components/organisms/modal/SignupForm';
import SideModal from '@/components/shared/SideModal';

interface LoginModalProps {
  lenis: Lenis | null;
}

const LoginModal = ({ lenis }: LoginModalProps) => {
  const closeRef = useRef(null);
  const loginTitleRef = useRef(null);
  const signupTitleRef = useRef(null);

  const { modalState, toggleLoginModal } = useModal();

  const handleTabSwitch = (tab: TabType) => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        duration: 0.2,
      },
    });

    if (tab === 'login') {
      tl.to(signupTitleRef.current, { autoAlpha: 0, y: -20 })
        .to('.signin-block', { autoAlpha: 0, y: -20 }, '<')

        .set([signupTitleRef.current, '.signin-block'], {
          display: 'none',
        })
        .set(loginTitleRef.current, { display: 'block', autoAlpha: 0, y: 20 })
        .set('.login-block', { display: 'flex', autoAlpha: 0, y: 20 })
        .to(loginTitleRef.current, { autoAlpha: 1, y: 0 })
        .to('.login-block', { autoAlpha: 1, y: 0 }, '<+0.1');
    } else if (tab === 'signup') {
      tl.to(loginTitleRef.current, { autoAlpha: 0, y: -20 })
        .to('.login-block', { autoAlpha: 0, y: -20 }, '<')

        .set([loginTitleRef.current, '.login-block'], {
          display: 'none',
        })
        .set(signupTitleRef.current, { display: 'block', autoAlpha: 0, y: 20 })
        .set('.signin-block', { display: 'flex', autoAlpha: 0, y: 20 })
        .to(signupTitleRef.current, { autoAlpha: 1, y: 0 })
        .to('.signin-block', { autoAlpha: 1, y: 0 }, '<+0.1');
    }

    return tl;
  };

  const onClose = () => {
    toggleLoginModal(false);
  };

  return (
    <SideModal
      isOpen={modalState.loginModalOpen}
      onClose={onClose}
      lenis={lenis}
      closeRef={closeRef}
    >
      <div className="relative z-20 box-border flex h-full w-full flex-col items-start justify-start gap-[2rem] px-[12px] py-[1rem] md:p-[1.25rem]">
        <div className="login-header relative box-border flex h-auto w-full items-stretch justify-between px-[5vw] pt-[2.5rem] pb-[2.5vw] md:pt-[2.5vw]">
          <div className="login-title relative flex w-full items-end justify-start">
            <span
              ref={loginTitleRef}
              className="login font-humane relative w-auto text-[3rem] leading-[75%] whitespace-nowrap text-[#302F35] md:text-[6vw]"
            >
              Log in to your account
            </span>
            <span
              ref={signupTitleRef}
              className="signin font-humane invisible relative hidden w-auto text-[3rem] leading-[75%] whitespace-nowrap text-[#302F35] opacity-0 md:text-[6vw]"
            >
              Sign up
            </span>
          </div>
          <div ref={closeRef} className="login-close absolute top-0 right-0">
            <div
              className="relative h-[20px] w-[20px] cursor-pointer md:h-[3rem] md:w-[3rem]"
              onClick={onClose}
            >
              <div className="icon absolute top-1/2 left-1/2 h-[3px] w-full -translate-1/2 rotate-45 bg-[#1d1d1d]"></div>
              <div className="icon absolute top-1/2 left-1/2 h-[3px] w-full -translate-1/2 -rotate-45 bg-[#1d1d1d]"></div>
            </div>
          </div>
        </div>
        <div
          className="wrapper relative h-full w-full grow overflow-y-scroll overscroll-contain"
          data-lenis-prevent
          style={{ scrollbarWidth: 'none' }}
        >
          <LoginForm handleTabSwitch={handleTabSwitch} />
          <SignupForm handleTabSwitch={handleTabSwitch} />
        </div>
      </div>
    </SideModal>
  );
};

export default LoginModal;
