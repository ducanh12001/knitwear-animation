import { useCallback, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router";
import { getPageTitle } from "../common/functions";

export const usePageTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  const startAnimation = useCallback(
    (callback = () => {}) => {
      setIsTransitioning(true);
      const pageTransition = document.querySelector("#pageTransition");

      if (!pageTransition) {
        setIsTransitioning(false);
        setDisplayLocation(location);
        return;
      }

      const color1 = pageTransition.querySelector(".color-1");
      const color2 = pageTransition.querySelector(".color-2");
      const title = pageTransition.querySelector(".title h2");

      if (title) {
        title.textContent = getPageTitle(location.pathname);
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location);
          setIsTransitioning(false);

          gsap.to(color2, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.8,
            ease: "power2.in",
          });
          gsap.to(color1, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.8,
            ease: "power2.in",
            delay: 0.2,
          });
          gsap.set(pageTransition, {
            opacity: 0,
            visibility: "hidden",
            delay: 1,
          });
          gsap.set(title, { y: -10, opacity: 0, visibility: "hidden", delay: 1.1 });

          callback();
        },
      });

      tl.set(pageTransition, { opacity: 1, visibility: "inherit" })
        .fromTo(
          color1,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "power2.out",
          },
        )
        .fromTo(
          color2,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6", // Overlap slightly with previous animation
        )
        .fromTo(
          title,
          { y: 10, opacity: 0, visibility: "hidden" },
          {
            y: 0,
            opacity: 1,
            visibility: "inherit",
            duration: 0.6,
            ease: "power2.out",
          },
        )
        .to({}, { duration: 0.5 }); // Hold the animation for a moment
    },
    [location],
  );

  return {
    location,
    displayLocation,
    isTransitioning,
    startAnimation,
    pageTitle: getPageTitle(location.pathname),
  };
};
