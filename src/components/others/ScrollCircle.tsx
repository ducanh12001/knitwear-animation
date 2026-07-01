import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMediaQuery } from 'react-responsive';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';
import { DESKTOP_BREAKPOINT } from '@/constant/breakpoint';

const CIRCLE_RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const ScrollCircle: React.FC = () => {
  const isSP = useMediaQuery({
    query: `(width < ${DESKTOP_BREAKPOINT}px)`,
  });
  const circleRef = useRef<SVGCircleElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const currentRotation = useRef(0);
  const lenis = useLenis();
  const arrowTweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!lenis) return;

    const circle = circleRef.current;
    const arrow = arrowRef.current;
    const header = document.querySelector('header.has-banner');

    if (!circle || !arrow) return;

    const updateProgress = (scroll: number, limit: number) => {
      const progress = limit > 0 ? Math.min(Math.max(scroll / limit, 0), 1) : 0;
      circle.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
    };

    const setArrowRotation = (rotation: number) => {
      if (rotation === currentRotation.current) return;

      arrowTweenRef.current?.kill();
      arrowTweenRef.current = gsap.to(arrow, {
        rotation,
        duration: 0.3,
        overwrite: true,
      });
      currentRotation.current = rotation;
    };

    const handleLenisScroll = (lenisInstance: Lenis) => {
      const { scroll, limit, direction } = lenisInstance;

      updateProgress(scroll, limit);

      if (scroll <= 0) {
        setArrowRotation(0);
        return;
      }

      if (scroll >= limit - 10) {
        setArrowRotation(180);
        return;
      }

      if (direction === 1) {
        setArrowRotation(0);
        header?.classList.add(isSP ? 'scrolled-mob' : 'scrolled');
      } else if (direction === -1) {
        setArrowRotation(180);
        header?.classList.remove(isSP ? 'scrolled-mob' : 'scrolled');
      }
    };

    updateProgress(lenis.scroll, lenis.limit);
    lenis.on('scroll', handleLenisScroll);

    const handleResize = () => updateProgress(lenis.scroll, lenis.limit);
    window.addEventListener('resize', handleResize);

    return () => {
      lenis.off('scroll', handleLenisScroll);
      window.removeEventListener('resize', handleResize);
      arrowTweenRef.current?.kill();
      scrollTweenRef.current?.kill();
    };
  }, [isSP, lenis]);

  const scrollToTop = () => {
    if (!lenis || lenis.scroll <= 0) return;

    scrollTweenRef.current?.kill();

    // Cancel any in-flight Lenis scroll animation
    lenis.scrollTo(lenis.scroll, { immediate: true, force: true });

    const scrollProxy = { y: lenis.scroll };

    scrollTweenRef.current = gsap.to(scrollProxy, {
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      onUpdate: () => {
        lenis.scrollTo(scrollProxy.y, { immediate: true, force: true });
        ScrollTrigger.update();
      },
      onComplete: () => {
        lenis.scrollTo(0, { immediate: true, force: true });
        ScrollTrigger.refresh();
        scrollTweenRef.current = null;
      },
    });
  };

  return (
    <div
      id="circle-scroll"
      className="fixed right-[5vw] bottom-[5vh] z-140 flex h-12 w-12 cursor-pointer items-center justify-center md:h-24 md:w-24"
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to top"
    >
      <div
        className="relative h-4 w-4 rotate-0 bg-surface-dark mask-[url('/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]"
        ref={arrowRef}
      />
      <div className="circle-back">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
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
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="#302F35"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollCircle;
