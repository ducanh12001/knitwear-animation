import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { useLocation } from 'react-router';
import { getPageTitle } from '@/constant/functions';

const TRANSITION_CONFIG = {
  duration: {
    clipPath: 0.8,
    title: 0.6,
    pause: 0.5,
    exit: 0.8,
  },
  delay: {
    color2: -0.6,
    exit: 0.2,
    reset: 1,
    titleReset: 1.1,
  },
  ease: {
    in: 'power2.in',
    out: 'power2.out',
  },
  clipPaths: {
    hidden: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    full: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
} as const;

export const usePageTransition = () => {
  const location = useLocation();
  const lenis = useLenis();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const startAnimation = useCallback(
    (callback = () => {}) => {
      const config = TRANSITION_CONFIG;
      setIsTransitioning(true);
      const pageTransition = document.querySelector('#pageTransition');

      if (!pageTransition) {
        setIsTransitioning(false);
        setDisplayLocation(location);
        return;
      }

      const color1 = pageTransition.querySelector('.color-1');
      const color2 = pageTransition.querySelector('.color-2');
      const title = pageTransition.querySelector('.title h2');

      if (title) {
        title.textContent = getPageTitle(location.pathname);
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location);
          lenis?.scrollTo(0, { immediate: true });
          setIsTransitioning(false);

          gsap.to(color2, {
            clipPath: config.clipPaths.hidden,
            duration: config.duration.clipPath,
            ease: config.ease.in,
          });
          gsap.to(color1, {
            clipPath: config.clipPaths.hidden,
            duration: config.duration.clipPath,
            ease: config.ease.in,
            delay: 0.2,
          });
          gsap.set(pageTransition, {
            opacity: 0,
            visibility: 'hidden',
            delay: 1,
          });
          gsap.set(title, {
            y: -10,
            opacity: 0,
            visibility: 'hidden',
            delay: 1.1,
          });

          callback();
        },
      });

      tl.set(pageTransition, { opacity: 1, visibility: 'inherit' })
        .fromTo(
          color1,
          { clipPath: config.clipPaths.bottom },
          {
            clipPath: config.clipPaths.full,
            duration: config.duration.clipPath,
            ease: config.ease.out,
          },
        )
        .fromTo(
          color2,
          { clipPath: config.clipPaths.bottom },
          {
            clipPath: config.clipPaths.full,
            duration: config.duration.clipPath,
            ease: config.ease.out,
          },
          '-=0.6',
        )
        .fromTo(
          title,
          { y: 10, opacity: 0, visibility: 'hidden' },
          {
            y: 0,
            opacity: 1,
            visibility: 'inherit',
            duration: 0.6,
            ease: config.ease.out,
          },
        )
        .to({}, { duration: 0.5 });

      timelineRef.current = tl;
    },
    [location, isTransitioning],
  );

  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  return {
    location,
    displayLocation,
    isTransitioning,
    startAnimation,
    cleanup,
    pageTitle: getPageTitle(location.pathname),
  };
};
