import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Roadmap() {
  const sectionRef = useRef(null);
  const innerImageRef = useRef(null);
  const imageScaleRef = useRef(null);
  const h2TextRef = useRef(null);
  const pathRef = useRef(null);
  const discoverButtonRef = useRef(null);
  const discoverLinkRef = useRef(null);
  const ellipseRef = useRef(null);
  const columnImageRefs = useRef([]);
  const columnImageScaleRefs = useRef([]);
  const columnTextH2Refs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const innerImage = innerImageRef.current;
    const imageScale = imageScaleRef.current;
    const h2Text = h2TextRef.current;
    const path = pathRef.current;
    const discoverButton = discoverButtonRef.current;
    const discoverLink = discoverLinkRef.current;
    const ellipse = ellipseRef.current;
    const columnImages = columnImageRefs.current;
    const columnImageScales = columnImageScaleRefs.current;
    const columnTextH2s = columnTextH2Refs.current;

    if (
      !section ||
      !innerImage ||
      !imageScale ||
      !h2Text ||
      !path ||
      !discoverButton ||
      !discoverLink ||
      !ellipse
    ) {
      return;
    }

    // 1. inner-image: clip-path animation (top-to-bottom)
    gsap.fromTo(
      innerImage,
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // 2. imageScale: scale từ 1.2 về 1
    gsap.fromTo(
      imageScale,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // 3. h2 trong inner-text: ease-bottom-to-top (opacity và translateY)
    gsap.fromTo(
      h2Text,
      { opacity: 0, y: "10vh" },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // 4. road (SVG path): vẽ từ trên xuống
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength.toString();
    gsap.fromTo(
      path,
      { strokeDashoffset: pathLength },
      {
        strokeDashoffset: 0,
        duration: 10,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // 5. discover-button: scale và opacity
    gsap.fromTo(
      discoverButton,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // 6. column-image: clip-path animation (top-to-bottom)
    columnImages.forEach((columnImage) => {
      gsap.fromTo(
        columnImage,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnImage,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // 7. imageScale trong column-image: scale từ 1.2 về 1
    columnImageScales.forEach((columnImageScale) => {
      gsap.fromTo(
        columnImageScale,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnImageScale,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // 8. h2 trong column-text: opacity và translateY
    columnTextH2s.forEach((h2) => {
      gsap.fromTo(
        h2,
        { opacity: 0, y: "10vh" },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: h2,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // 9. Hiệu ứng hover cho ellipse trong front-track
    const handleMouseEnter = () => {
      gsap.to(ellipse, {
        strokeDashoffset: 993.52 * 2,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ellipse, {
        strokeDashoffset: 993.52,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    discoverLink.addEventListener("mouseenter", handleMouseEnter);
    discoverLink.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      discoverLink.removeEventListener("mouseenter", handleMouseEnter);
      discoverLink.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-auto w-full flex-col items-start justify-start gap-[15vh] bg-[#A9AFA4] py-[15vh]"
    >
      <div className="top relative grid h-auto w-full grid-cols-2">
        <div className="image relative flex h-auto w-full items-start justify-end">
          <div ref={innerImageRef} className="inner-image overflow-hidden">
            <div ref={imageScaleRef} className="imageScale">
              <img
                src="https://akkeknitwear.com/website/wp-content/uploads/2023/10/akke-1-1.webp"
                className="block h-auto w-[33vw]"
              />
            </div>
          </div>
        </div>
        <div className="text relative h-auto w-full pt-[5vh]">
          <div className="inner-text relative flex h-auto w-full translate-x-0 flex-col items-end justify-start md:translate-x-[-5vw]">
            <div className="relative w-full">
              <h2
                ref={h2TextRef}
                className="text-[20px] leading-[120%] tracking-normal text-white md:text-[3vw] md:tracking-[-2px]"
              >
                AKKE is technical innovation and yarn evolution, a new space between fashion and
                functionality.
              </h2>
            </div>
            <div
              ref={discoverButtonRef}
              className="discover-button relative mt-[5rem] hidden h-auto w-auto md:block"
            >
              <a ref={discoverLinkRef} className="relative block h-full w-full cursor-pointer">
                <div className="back-track absolute top-0 left-0 h-full w-full">
                  <svg
                    viewBox="0 0 434.86865234375 104.68115234375"
                    className="relative block h-full w-full overflow-visible"
                  >
                    <ellipse
                      cx="217.434326171875"
                      cy="52.340576171875"
                      rx="217.434326171875"
                      ry="52.340576171875"
                      className="fill-[#A9AFA4] stroke-white stroke-2"
                      style={{
                        strokeLinecap: "round",
                      }}
                    />
                  </svg>
                </div>
                <div className="front-track absolute top-0 left-0 h-full w-full">
                  <svg
                    viewBox="0 0 434.86865234375 104.68115234375"
                    className="relative block h-full w-full overflow-visible"
                  >
                    <ellipse
                      cx="217.434326171875"
                      cy="52.340576171875"
                      rx="217.434326171875"
                      ry="52.340576171875"
                      className="fill-[#A9AFA4] stroke-white stroke-4"
                      style={{
                        strokeLinecap: "round",
                        strokeDasharray: "993.52, 993.52",
                        strokeDashoffset: "993.52",
                      }}
                      ref={ellipseRef}
                    />
                  </svg>
                </div>
                <span className="leading-full relative box-border block px-[3.75vw] py-[2.3vw] text-[1.75rem] text-white uppercase">
                  Discover Akke World
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="button-element relative mx-auto my-0 block h-auto w-auto md:hidden">
        <a className="button-container relative block h-full w-full" href="">
          <div className="back-track absolute top-0 left-0 h-full w-full"></div>
          <span className="leading-full relative box-border block px-[3.75vw] py-[2.3vw] text-[1.75rem] text-white uppercase">
            Discover Akke World
          </span>
        </a>
      </div>
      <div className="bottom relative z-20 mt-[2.5rem] grid h-auto w-full grid-cols-2 md:mt-0">
        <div className="column relative h-auto w-full">
          <div className="cat relative flex h-auto w-full items-start justify-center">
            <a className="relative block h-full w-[45vw] md:w-[33vw]">
              <div
                ref={(el) => (columnImageRefs.current[0] = el)}
                className="column-image relative z-10 h-auto w-full overflow-hidden"
              >
                <div ref={(el) => (columnImageScaleRefs.current[0] = el)} className="imageScale">
                  <div className="relative h-auto w-full">
                    <img
                      src="https://akkeknitwear.com/website/wp-content/uploads/2023/10/akke-2-1.webp"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="column-text absolute top-1/2 left-0 z-15 flex h-auto w-full -translate-y-1/2 flex-col items-center justify-center">
                <h2
                  ref={(el) => (columnTextH2Refs.current[0] = el)}
                  className="font-humane leading-full text-[12vw] font-extralight text-white uppercase"
                >
                  Men
                </h2>
              </div>
            </a>
          </div>
        </div>
        <div className="column relative h-auto w-full">
          <div className="cat relative mt-[15vh] flex h-auto w-full items-start justify-center">
            <a className="relative block h-full w-[45vw] md:w-[33vw]">
              <div
                ref={(el) => (columnImageRefs.current[1] = el)}
                className="column-image relative z-10 h-auto w-full overflow-hidden"
              >
                <div ref={(el) => (columnImageScaleRefs.current[1] = el)} className="imageScale">
                  <div className="relative h-auto w-full">
                    <img
                      src="https://akkeknitwear.com/website/wp-content/uploads/2023/10/akke-3-1.webp"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="column-text absolute top-1/2 left-0 z-15 flex h-auto w-full -translate-y-1/2 flex-col items-center justify-center">
                <h2
                  ref={(el) => (columnTextH2Refs.current[1] = el)}
                  className="font-humane leading-full text-[12vw] font-extralight text-white uppercase"
                >
                  Women
                </h2>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="road absolute top-0 left-1/2 z-15 h-full -translate-x-1/2">
        <svg
          data-name="Livello 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 680.74 2454.84"
          className="relative block h-full w-auto"
        >
          <path
            ref={pathRef}
            className="fill-none stroke-white stroke-2"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            d="M1,1C55.88,99.7,97.44,104.94,130.52,133.07c33.08,28.13-4.39,60.24,52.68,83.41,57.07,23.17,19.76,30.12-8.05,85.06-13.79,27.24,46.81,45,75.04,83.96,28.23,38.96,71.32,34.93,72.81,65.83,1.49,30.9,26.98,24.05,20.28,30.44-19.07,18.2-133.94-21.65-115.62,.58,32.93,39.97,96.55,17.62,58.09,60.07-20.03,22.1-107.66,5.12-143.32,37.36-35.66,32.24-59.14,30.21-88.73,60.71-20.68,21.32,24.35-19.77,158.24-26.07,118.61-5.58,136.33-118.76,142.27-91.89,5.94,26.87,37.14,26.4,63.88,51.92,26.75,25.52,29.72,59.11,14.86,53.74-14.86-5.37-28.22-3.56-44.57,17.68-16.34,21.24-78.75-2.43-104.01,19.06-25.26,21.49-98.07,143.74-53.49,88.66,44.58-55.08,124.18-48.33,155.38-64.45,31.2-16.12,66.58-46.53,75.98-14.45,9.81,33.48,23.43,23.55,55.42,35.91,102.53,39.63-140.8,44.25-154.99,138.41-11.52,76.46-24.44,28.18-44.06,127.54-23.13,117.15-162.98,193.95-182.35,268.67-19.36,74.72,2.5,102.53-56.77,198.1-59.27,95.58-92.33,256.29-70.79,187.68,19.76-62.95,130.06-142.5,146.92-248.5,12.5-78.62,29.79-92.24,77.51-147.2,16.62-19.14,45.57-59.6,45.57-94.35,0-42.25,56.1-86.07,72.44-125.12,47.8-114.2,14.27-218.38,93.29-89.78,28.47,46.32,61.74,54.74,54.33,69.51-7.41,14.77,14.54,20.27,9.6,58.5-4.94,38.23,10.7,21.72,6.59,46.05-4.12,24.33-38.69,18.25-55.98,36.49-17.29,18.25-80.67,8.69-104.54,36.49-23.87,27.8-82.32,101.66-60.92,76.46s83.97-65.17,107.01-50.39c23.05,14.77,90.55-66.03,91.37-48.66,.82,17.38,8.51-18.83,23.87,33.31,15.37,52.13,53.82,37.04,69.15,60.24,19.39,29.35-33.05-14.74-69.15,13.9-16.18,12.84-75.73-9.27-92.2,8.11-16.46,17.38-61.46,26.65-68.05,55.61-6.59,28.96-68.05,15.06-70.25,40.55-2.2,25.49-25.24,37.07-86.71,78.78-61.46,41.71-5.49,16.22,66.95,1.16,72.44-15.06,62.56-12.74,99.88-71.83,37.32-59.08,86.71-32.44,86.71-52.13s39.39-17.65,65.86-31.28c45-23.17,43.66-31.96,96.59,16.22,33.63,30.61,73.54,19.69,63.66,44.02-9.88,24.33-149.27,72.99-100.98,120.48,48.29,47.5,19.76,30.12-21.95,19.69-41.71-10.43,10.98-96.16,3.29-99.63-7.68-3.48-68.05,47.5-97.69,67.19-29.63,19.69-59.27-26.65-87.81-12.74-28.54,13.9-97.69,35.91-133.91,45.18-36.22,9.27-79.03-25.49-90,28.96-10.98,54.45-25.24,60.24,6.43,15.06,31.68-45.18,19.91-9.27,57.29,6.95,37.38,16.22,96.52-31.28,134.94-34.86,38.42-3.58,5.49,55.72,28.54,41.81,23.05-13.9,54.88-46.34,103.17-27.8,48.29,18.54,65.84-22.82,102.08-10.43,14.77,5.05-51.59,40.55-51.59,52.13,0,11.58-113.05,100.79-88.9,122.8,24.15,22.01-76.83,64.88-90,97.31-13.17,32.44-87.73,69.32-88.28,90.2-1.79,68.35-88.4,53.95-120.27,161.61-29.97,101.28-5.49,118.17-80.12,213.16-2.22,2.82-4.45,5.82-6.68,8.95-35.74,50.21-54.79,111.46-54.79,174.27v26.35"
          />
        </svg>
      </div>
    </section>
  );
}

export default Roadmap;
