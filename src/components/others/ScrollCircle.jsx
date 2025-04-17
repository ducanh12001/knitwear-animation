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
        gsap.to(arrow, { rotation: 0, duration: 0.3 });
      } else if (scrollY >= maxScroll - 2) {
        gsap.to(arrow, { rotation: 180, duration: 0.3 });
      } else {
        if (scrollY > lastScrollY.current) {
          gsap.to(arrow, { rotation: 0, duration: 0.3 });
        } else {
          gsap.to(arrow, { rotation: 180, duration: 0.3 });
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
    <div
      id="circle-scroll"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <div
        className="relative h-[1.5rem] w-[1.5rem] rotate-0 bg-[#302F35] mask-[url('/src/assets/arrow.svg')] mask-no-repeat"
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
          ></circle>
        </svg>
      </div>
      {/* <svg
          data-name="Livello 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 680.74 2454.84"
          className="relative block h-full w-auto"
        >
          <path
            classname="cls-1 fill-none stroke-white stroke-2"
            d="M1,1C55.88,99.7,97.44,104.94,130.52,133.07c33.08,28.13-4.39,60.24,52.68,83.41,57.07,23.17,19.76,30.12-8.05,85.06-13.79,27.24,46.81,45,75.04,83.96,28.23,38.96,71.32,34.93,72.81,65.83,1.49,30.9,26.98,24.05,20.28,30.44-19.07,18.2-133.94-21.65-115.62,.58,32.93,39.97,96.55,17.62,58.09,60.07-20.03,22.1-107.66,5.12-143.32,37.36-35.66,32.24-59.14,30.21-88.73,60.71-20.68,21.32,24.35-19.77,158.24-26.07,118.61-5.58,136.33-118.76,142.27-91.89,5.94,26.87,37.14,26.4,63.88,51.92,26.75,25.52,29.72,59.11,14.86,53.74-14.86-5.37-28.22-3.56-44.57,17.68-16.34,21.24-78.75-2.43-104.01,19.06-25.26,21.49-98.07,143.74-53.49,88.66,44.58-55.08,124.18-48.33,155.38-64.45,31.2-16.12,66.58-46.53,75.98-14.45,9.81,33.48,23.43,23.55,55.42,35.91,102.53,39.63-140.8,44.25-154.99,138.41-11.52,76.46-24.44,28.18-44.06,127.54-23.13,117.15-162.98,193.95-182.35,268.67-19.36,74.72,2.5,102.53-56.77,198.1-59.27,95.58-92.33,256.29-70.79,187.68,19.76-62.95,130.06-142.5,146.92-248.5,12.5-78.62,29.79-92.24,77.51-147.2,16.62-19.14,45.57-59.6,45.57-94.35,0-42.25,56.1-86.07,72.44-125.12,47.8-114.2,14.27-218.38,93.29-89.78,28.47,46.32,61.74,54.74,54.33,69.51-7.41,14.77,14.54,20.27,9.6,58.5-4.94,38.23,10.7,21.72,6.59,46.05-4.12,24.33-38.69,18.25-55.98,36.49-17.29,18.25-80.67,8.69-104.54,36.49-23.87,27.8-82.32,101.66-60.92,76.46s83.97-65.17,107.01-50.39c23.05,14.77,90.55-66.03,91.37-48.66,.82,17.38,8.51-18.83,23.87,33.31,15.37,52.13,53.82,37.04,69.15,60.24,19.39,29.35-33.05-14.74-69.15,13.9-16.18,12.84-75.73-9.27-92.2,8.11-16.46,17.38-61.46,26.65-68.05,55.61-6.59,28.96-68.05,15.06-70.25,40.55-2.2,25.49-25.24,37.07-86.71,78.78-61.46,41.71-5.49,16.22,66.95,1.16,72.44-15.06,62.56-12.74,99.88-71.83,37.32-59.08,86.71-32.44,86.71-52.13s39.39-17.65,65.86-31.28c45-23.17,43.66-31.96,96.59,16.22,33.63,30.61,73.54,19.69,63.66,44.02-9.88,24.33-149.27,72.99-100.98,120.48,48.29,47.5,19.76,30.12-21.95,19.69-41.71-10.43,10.98-96.16,3.29-99.63-7.68-3.48-68.05,47.5-97.69,67.19-29.63,19.69-59.27-26.65-87.81-12.74-28.54,13.9-97.69,35.91-133.91,45.18-36.22,9.27-79.03-25.49-90,28.96-10.98,54.45-25.24,60.24,6.43,15.06,31.68-45.18,19.91-9.27,57.29,6.95,37.38,16.22,96.52-31.28,134.94-34.86,38.42-3.58,5.49,55.72,28.54,41.81,23.05-13.9,54.88-46.34,103.17-27.8,48.29,18.54,65.84-22.82,102.08-10.43,14.77,5.05-51.59,40.55-51.59,52.13,0,11.58-113.05,100.79-88.9,122.8,24.15,22.01-76.83,64.88-90,97.31-13.17,32.44-87.73,69.32-88.28,90.2-1.79,68.35-88.4,53.95-120.27,161.61-29.97,101.28-5.49,118.17-80.12,213.16-2.22,2.82-4.45,5.82-6.68,8.95-35.74,50.21-54.79,111.46-54.79,174.27v26.35"
            style={{
              strokeDasharray: "9009.01, 9009.01",
              strokeDashoffset: 0,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
        </svg> */}
    </div>
  );
}

export default ScrollCircle;
