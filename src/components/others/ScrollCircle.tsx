import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const ScrollCircle: React.FC = () => {
  const isSP = useMediaQuery({
    query: '(width < 768px)',
  });
  const circleRef = useRef<SVGCircleElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const circle = circleRef.current;
    const arrow = arrowRef.current;
    const header = document.querySelector('header.has-banner');

    if (!circle || !arrow) return;

    const progressAnimation = gsap.to(circle, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        refreshPriority: -1,
      },
      strokeDashoffset: 0,
      ease: 'none',
    });

    const handleLenisScroll = (lenisInstance: Lenis) => {
      const { scroll, limit } = lenisInstance;

      if (scroll <= 0) {
        gsap.to(arrow, { rotation: 0, duration: 0.3 });
      } else if (scroll >= limit - 10) {
        gsap.to(arrow, { rotation: 180, duration: 0.3 });
      } else {
        if (scroll > lastScrollY.current) {
          gsap.to(arrow, { rotation: 0, duration: 0.3 });
          header?.classList.add(isSP ? 'scrolled-mob' : 'scrolled');
        } else {
          gsap.to(arrow, { rotation: 180, duration: 0.3 });
          header?.classList.remove(isSP ? 'scrolled-mob' : 'scrolled');
        }
      }
      lastScrollY.current = scroll;
    };

    lenis.on('scroll', handleLenisScroll);

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    const timeoutId = setTimeout(refreshScrollTrigger, 100);

    return () => {
      clearTimeout(timeoutId);
      lenis.off('scroll', handleLenisScroll);
      progressAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isSP, lenis]);

  const scrollToTop = () => {
    const arrow = arrowRef.current;
    if (
      arrow &&
      lenis &&
      (gsap.getProperty(arrow, 'rotation') as number) > 150
    ) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    }
  };

  return (
    <div
      id="circle-scroll"
      className="fixed right-[5vw] bottom-[5vh] z-140 flex h-12 w-12 cursor-pointer items-center justify-center md:h-24 md:w-24"
      onClick={scrollToTop}
    >
      <div
        className="relative h-4 w-4 rotate-0 bg-[#302F35] mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]"
        ref={arrowRef}
      />
      <div className="circle-back">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(48, 47, 53, 0.2)"
            strokeWidth="2"
          />
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
            fill="none"
            stroke="#302F35"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="301.59" // 2 * π * 48
            strokeDashoffset="301.59"
            style={{
              transition: 'stroke-dashoffset 0.1s ease-out',
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollCircle;
