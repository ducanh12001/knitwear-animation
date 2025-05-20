import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function ScrollCircle() {
  const isSP = useMediaQuery({
    query: "(width < 768px)",
  });
  const circleRef = useRef(null);
  const arrowRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const circle = circleRef.current;
    const arrow = arrowRef.current;
    const header = document.querySelector("header.has-banner");

    gsap.to(circle, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      strokeDashoffset: 0,
      ease: "none",
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      if (scrollY <= 0) {
        gsap.to(arrow, { rotation: 0, duration: 0.3 });
      } else if (scrollY >= maxScroll - 2) {
        gsap.to(arrow, { rotation: 180, duration: 0.3 });
      } else {
        if (scrollY > lastScrollY.current) {
          gsap.to(arrow, { rotation: 0, duration: 0.3 });
          header?.classList.add(isSP ? "scrolled-mob" : "scrolled");
        } else {
          gsap.to(arrow, { rotation: 180, duration: 0.3 });
          header?.classList.remove(isSP ? "scrolled-mob" : "scrolled");
        }
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isSP]);

  const scrollToTop = () => {
    const arrow = arrowRef.current;
    if (arrow && gsap.getProperty(arrow, "rotation") > 150) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      id="circle-scroll"
      className="fixed right-[5vw] bottom-[5vh] z-140 flex h-12 w-12 items-center justify-center md:h-24 md:w-24"
      onClick={scrollToTop}
    >
      <div
        className="relative h-4 w-4 rotate-0 bg-[#302F35] mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]"
        ref={arrowRef}
      />
      <div className="circle-back">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48"></circle>
        </svg>
      </div>
      <div className="circle-front">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            ref={circleRef}
            className="progress-circle"
            cx="50"
            cy="50"
            r="48"
          />
        </svg>
      </div>
    </div>
  );
}

export default ScrollCircle;
