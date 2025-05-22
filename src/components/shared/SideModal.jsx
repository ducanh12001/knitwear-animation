import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SideModal({
  isOpen,
  onClose,
  children,
  lenis,
  closeRef,
  className = "",
  animate = true,
}) {
  const modalRef = useRef(null);
  const bgRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!animate) return;
    const animations = [];

    if (isOpen) {
      if (lenis) lenis.stop();

      animations.push(
        gsap.set(modalRef.current, { autoAlpha: 1 }),
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
  }, [isOpen, animate, lenis, closeRef]);

  return (
    <div
      ref={modalRef}
      className={`invisible fixed top-0 left-0 z-155 h-full w-full overflow-hidden opacity-0 ${className}`}
    >
      <div
        ref={bgRef}
        className="absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute top-0 right-0 z-20 h-full w-[95vw] origin-top-right translate-x-[100%] scale-x-95 overflow-hidden bg-[#e1e1e1] md:w-[35vw]"
      >
        {children}
      </div>
    </div>
  );
}
