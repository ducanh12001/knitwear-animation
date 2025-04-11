import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollCircle() {
  const circleRef = useRef(null);
  const arrowRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const circle = circleRef.current;
    const arrow = arrowRef.current;

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
        gsap.to(arrow, { rotation: 180, duration: 0.3 });
      } else if (scrollY >= maxScroll) {
        gsap.to(arrow, { rotation: 0, duration: 0.3 });
      } else {
        if (scrollY > lastScrollY.current) {
          gsap.to(arrow, { rotation: 180, duration: 0.3 });
        } else {
          gsap.to(arrow, { rotation: 0, duration: 0.3 });
        }
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="circle-scroll">
      <div className="arrow up" ref={arrowRef} />
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
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default ScrollCircle;
