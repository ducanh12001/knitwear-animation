import { useEffect, useRef } from 'react';
import Lenis, { type LenisOptions } from 'lenis';

export const useSmoothScroll = (options: LenisOptions = {}) => {
  const lenisRef = useRef<Lenis>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1,
      syncTouch: true,
      wheelMultiplier: 1,
      lerp: 0.1,
      smoothWheel: true,
      syncTouchLerp: 0.1,
      ...options,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [options]);

  return lenisRef;
};
