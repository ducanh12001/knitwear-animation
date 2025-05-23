import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useModal } from "@/hooks/useModal";

export default function LoginModal({ lenis }) {
  const [activeTab, setActiveTab] = useState("login");
  const modalRef = useRef(null);
  const bgRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const loginTitleRef = useRef(null);
  const signupTitleRef = useRef(null);

  const { modalState, toggleLoginModal } = useModal();

  useEffect(() => {
    const animations = [];

    if (modalState.loginModalOpen) {
      if (lenis) lenis.stop();

      handleTabSwitch(activeTab);

      gsap.set(modalRef.current, {
        opacity: 1,
        visibility: "visible",
      });

      animations.push(
        gsap.to(bgRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        }),
        gsap.to(panelRef.current, {
          x: 0,
          scaleX: 1,
          duration: 0.3,
          delay: 0.4,
          ease: "power2.out",
        }),
        gsap.to(closeRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          delay: 0.4,
          ease: "power2.out",
        }),
      );
    } else {
      if (lenis) lenis.start();

      animations.push(
        gsap.to(closeRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.out",
        }),
        gsap.to(panelRef.current, {
          x: "100%",
          scaleX: 0.95,
          duration: 0.5,
          ease: "power2.out",
        }),
        gsap.to(bgRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          delay: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(modalRef.current, {
              opacity: 0,
              visibility: "hidden",
            });
          },
        }),
      );
    }

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [modalState.loginModalOpen, lenis, activeTab]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
        duration: 0.2,
      },
    });

    if (tab === "login") {
      tl.to(signupTitleRef.current, { autoAlpha: 0, y: -20 })
        .to(".signin-block", { autoAlpha: 0, y: -20 }, "<")

        .set([signupTitleRef.current, ".signin-block"], {
          display: "none",
        })
        .set(loginTitleRef.current, { display: "block", autoAlpha: 0, y: 20 })
        .set(".login-block", { display: "flex", autoAlpha: 0, y: 20 })
        .to(loginTitleRef.current, { autoAlpha: 1, y: 0 })
        .to(".login-block", { autoAlpha: 1, y: 0 }, "<+0.1");
    } else if (tab === "signup") {
      tl.to(loginTitleRef.current, { autoAlpha: 0, y: -20 })
        .to(".login-block", { autoAlpha: 0, y: -20 }, "<")

        .set([loginTitleRef.current, ".login-block"], {
          display: "none",
        })
        .set(signupTitleRef.current, { display: "block", autoAlpha: 0, y: 20 })
        .set(".signin-block", { display: "flex", autoAlpha: 0, y: 20 })
        .to(signupTitleRef.current, { autoAlpha: 1, y: 0 })
        .to(".signin-block", { autoAlpha: 1, y: 0 }, "<+0.1");
    }

    return tl;
  };

  const onClose = () => {
    toggleLoginModal(false);
  };

  return (
    <div
      id="login_signup"
      ref={modalRef}
      className="invisible fixed top-0 left-0 z-155 h-full w-full overflow-hidden opacity-0"
    >
      <div
        ref={bgRef}
        className="login-bg absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="login-panel absolute top-0 right-0 z-20 h-full w-[95vw] origin-top-right translate-x-[100%] scale-x-95 overflow-hidden bg-[#e1e1e1] md:w-[35vw]"
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
            style={{ scrollbarWidth: "none" }}
          >
            <LoginForm handleTabSwitch={handleTabSwitch} />
            <SignupForm handleTabSwitch={handleTabSwitch} />
          </div>
        </div>
      </div>
    </div>
  );
}
