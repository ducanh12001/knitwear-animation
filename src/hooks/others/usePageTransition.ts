import { useCallback, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
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

      gsap.set(pageTransition, { opacity: 1, visibility: 'inherit' });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          callback();
        },
      });

      tl.fromTo(
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
          config.delay.color2,
        )
        .fromTo(
          title,
          { y: 10, opacity: 0, visibility: 'hidden' },
          {
            y: 0,
            opacity: 1,
            visibility: 'inherit',
            duration: config.duration.title,
            ease: config.ease.out,
          },
        )
        .to({}, { duration: config.duration.pause })
        .add(() => {
          setDisplayLocation(location);
          lenis?.scrollTo(0, { immediate: true });
        })
        .to(color2, {
          clipPath: config.clipPaths.hidden,
          duration: config.duration.exit,
          ease: config.ease.in,
        })
        .to(
          color1,
          {
            clipPath: config.clipPaths.hidden,
            duration: config.duration.exit,
            ease: config.ease.in,
          },
          `-=${config.duration.exit - config.delay.exit}`,
        )
        .set(pageTransition, { opacity: 0, visibility: 'hidden' })
        .set(title, { y: -10, opacity: 0, visibility: 'hidden' });

      timelineRef.current = tl;
    },
    [location, lenis],
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
    transitionTitle: getPageTitle(location.pathname),
  };
};
