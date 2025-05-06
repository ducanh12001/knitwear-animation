import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const animateModal = (isOpen, target, options = {}) => {
  gsap.to(target, {
    ...(isOpen
      ? { autoAlpha: 1, visibility: "visible" }
      : {
          autoAlpha: 0,
          visibility: "hidden",
          onComplete: () => gsap.set(target, { visibility: "hidden" }),
        }),
    duration: 0.5,
    ease: "power2.out",
    ...options,
  });
};

const animateTab = (target, isActive, delay = 0) => {
  gsap.to(target, {
    opacity: isActive ? 1 : 0,
    display: isActive ? "block" : "none",
    visibility: isActive ? "visible" : "hidden",
    duration: 0.5,
    ease: "power2.out",
    delay,
  });
};

export default function LoginModal({ isOpen, onClose, lenis }) {
  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      handleTabSwitch("login");
      gsap.set("#login_signup", {
        opacity: 1,
        visibility: "visible",
      });
      gsap.to(".login-bg", {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(".login-panel", {
        x: 0,
        scaleX: 1,
        duration: 0.3,
        delay: 0.4,
        ease: "power2.out",
      });
      gsap.to(".login-close", {
        autoAlpha: 1,
        duration: 0.3,
        delay: 0.4,
        ease: "power2.out",
      });
    } else {
      if (lenis) lenis.start();
      gsap.to(".login-close", {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".login-panel", {
        x: "100%",
        scaleX: 0.95,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(".login-bg", {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.set("#login_signup", {
        opacity: 0,
        visibility: "hidden",
        delay: 0.5,
      });
    }
  }, [isOpen, lenis]);

  const handleTabSwitch = (tab) => {
    if (tab === "login") {
      gsap.to(".login-title .signin", {
        autoAlpha: 0,
        display: "none",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".login-title .login", {
        autoAlpha: 1,
        display: "block",
        duration: 0.3,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.to(".signin-block", {
        autoAlpha: 0,
        display: "none",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".login-block", {
        autoAlpha: 1,
        display: "flex",
        duration: 0.3,
        delay: 0.2,
        ease: "power2.out",
      });
    } else if (tab === "signup") {
      gsap.to(".login-title .login", {
        autoAlpha: 0,
        display: "none",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".login-title .signin", {
        autoAlpha: 1,
        display: "block",
        duration: 0.3,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.to(".login-block", {
        autoAlpha: 0,
        display: "none",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".signin-block", {
        autoAlpha: 1,
        display: "flex",
        duration: 0.3,
        delay: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      id="login_signup"
      className="invisible fixed top-0 left-0 z-155 h-full w-full overflow-hidden opacity-0"
    >
      <div
        className="login-bg absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0"
        onClick={onClose}
      />
      <div className="login-panel absolute top-0 right-0 z-20 h-full w-[95vw] origin-top-right translate-x-[100%] scale-x-95 overflow-hidden bg-[#e1e1e1] md:w-[35vw]">
        <div></div>
        <div className="relative z-20 box-border flex h-full w-full flex-col items-start justify-start gap-[2rem] px-[12px] py-[1rem] md:p-[1.25rem]">
          <div className="login-header relative box-border flex h-auto w-full items-stretch justify-between px-[5vw] pt-[2.5rem] pb-[2.5vw] md:pt-[2.5vw]">
            <div className="login-title relative flex w-full items-end justify-start">
              <span className="login font-humane relative w-auto text-[3rem] leading-[75%] whitespace-nowrap text-[#302F35] md:text-[6vw]">
                Log in to your account
              </span>
              <span className="signin font-humane invisible relative hidden w-auto text-[3rem] leading-[75%] whitespace-nowrap text-[#302F35] opacity-0 md:text-[6vw]">
                Sign up
              </span>
            </div>
            <div className="login-close absolute top-0 right-0">
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
            className="wrapper data-lenis-prevent relative h-full w-full grow overflow-y-scroll overscroll-contain"
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
