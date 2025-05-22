import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useHeaderAnimation = (modalState, textColor, headerRef) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const header = headerRef.current;

    if (timelineRef.current) timelineRef.current.kill();

    if (!modalState.menuOpen) {
      gsap.set(".js-header-color", { color: textColor });
      gsap.set(".js-header-background", { backgroundColor: textColor });
    }

    if (modalState.menuOpen) {
      if (header.classList.contains("scrolled-mob")) {
        header.classList.replace("scrolled-mob", "was-scolled");
      }

      timelineRef.current = gsap.timeline();
      const tl = timelineRef.current;

      tl.to(".js-header-background", {
        backgroundColor: "#1d1d1d",
        duration: 0.4,
        ease: "power2.inOut",
      }).to(
        ".js-header-color",
        {
          color: "#1d1d1d",
          duration: 0.4,
          ease: "power2.inOut",
        },
        "<",
      );

      tl.to(
        ".hamburger .top",
        {
          top: "8px",
          duration: 0.25,
          ease: "power2.inOut",
        },
        "-=0.2",
      ).to(
        ".hamburger .bottom",
        {
          bottom: "8px",
          duration: 0.25,
          ease: "power2.inOut",
        },
        "<",
      );

      tl.to(
        ".hamburger .center",
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "-=0.1",
      )
        .to(
          ".hamburger .top",
          {
            scale: 0.8,
            rotation: 20,
            duration: 0.25,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          ".hamburger .bottom",
          {
            scale: 0.8,
            rotation: -20,
            duration: 0.25,
            ease: "power2.inOut",
          },
          "<",
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (header?.classList.contains("was-scolled")) {
            header.classList.replace("was-scolled", "scrolled-mob");
          }
        },
      });

      tl.to(".hamburger .top", {
        scale: 1,
        rotation: 0,
        duration: 0.25,
        ease: "power2.inOut",
      })
        .to(
          ".hamburger .bottom",
          {
            scale: 1,
            rotation: 0,
            duration: 0.25,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          ".hamburger .center",
          {
            autoAlpha: 1,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "<",
        );

      tl.to(
        ".hamburger .top",
        {
          top: 0,
          duration: 0.25,
          ease: "power2.inOut",
        },
        "-=0.1",
      ).to(
        ".hamburger .bottom",
        {
          bottom: 0,
          duration: 0.25,
          ease: "power2.inOut",
        },
        "<",
      );

      tl.to(
        ".js-header-background",
        {
          backgroundColor: textColor,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.3",
      ).to(
        ".js-header-color",
        {
          color: textColor,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "<",
      );
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [modalState.menuOpen, textColor]);
};
