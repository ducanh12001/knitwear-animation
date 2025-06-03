import { useCallback, useRef } from 'react';
import { useModal } from '@/hooks/others/useModal';
import { useLoginModal } from '@/hooks/pages/useLoginModal';
import LoginForm from '@/components/organisms/form/LoginForm';
import SignupForm from '@/components/organisms/form/SignupForm';
import SideModal from '@/components/organisms/modal/SideModal';
import { CloseButton } from '@/components/atoms/buttons/CloseButton';

const LoginModal = () => {
  const { modalState, toggleLoginModal } = useModal();
  const { activeTab, switchTab, refs } = useLoginModal();

  const closeRef = useRef(null);

  const handleClose = useCallback(() => {
    toggleLoginModal(false);
  }, [toggleLoginModal]);

  return (
    <SideModal
      isOpen={modalState.loginModalOpen}
      onClose={handleClose}
      closeRef={closeRef}
    >
      <div className="relative z-20 box-border flex h-full w-full flex-col items-start justify-start gap-[2rem] px-[12px] py-[1rem] md:p-[1.25rem]">
        <div className="relative box-border flex h-auto w-full items-stretch justify-between px-[5vw] pt-[2.5rem] pb-[2.5vw] md:pt-[2.5vw]">
          <div className="relative flex w-full items-end justify-start">
            <span
              ref={refs.loginTitleRef}
              className="font-humane relative w-auto text-[3rem] leading-[75%] whitespace-nowrap text-[#302F35] md:text-[6vw]"
            >
              Log in to your account
            </span>
            <span
              ref={refs.signupTitleRef}
              className="font-humane invisible relative hidden w-auto text-[3rem] leading-[75%] whitespace-nowrap text-[#302F35] opacity-0 md:text-[6vw]"
            >
              Sign up
            </span>
          </div>
          <div ref={closeRef} className="absolute top-0 right-0">
            <CloseButton onClick={handleClose} />
          </div>
        </div>
        <div
          ref={refs.scrollContainerRef}
          className="relative h-full w-full grow overflow-y-scroll overscroll-contain"
          data-lenis-prevent
          style={{ scrollbarWidth: 'none' }}
        >
          <LoginForm
            ref={refs.loginFormRef}
            handleSwitchTab={switchTab}
            activeTab={activeTab}
          />
          <SignupForm
            ref={refs.signupFormRef}
            handleSwitchTab={switchTab}
            activeTab={activeTab}
          />
        </div>
      </div>
    </SideModal>
  );
};

export default LoginModal;
